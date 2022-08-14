// modified from <https://github.com/lucacasonato/deno_local_file_fetch/blob/60275472e2/mod.ts> [with "Copyright (c) 2020 Luca Casonato"; MIT License]

// spell-checker:ignore (people) Luca Casonato * lucacasonato

import { iter } from 'https://deno.land/std@0.134.0/io/util.ts';
import { lookup } from 'https://deno.land/x/media_types@v2.8.4/mod.ts';

import { readableStreamFromIterable } from 'https://deno.land/std@0.134.0/streams/conversion.ts';

const originalFetch = globalThis.fetch;

function isDenoProcessStatus(x: unknown): x is Deno.ProcessStatus {
	return ((x as Deno.ProcessStatus).success !== undefined) &&
		((x as Deno.ProcessStatus).code !== undefined);
}

async function fetch(input: string | Request | URL, init?: RequestInit): Promise<Response> {
	const url = typeof input === 'string'
		? new URL(input)
		: input instanceof Request
		? new URL(input.url)
		: input;

	if (url.protocol === 'file:') {
		// Only allow GET requests
		if (init && init.method && init.method !== 'GET') {
			throw new TypeError(`${init.method} is not a supported method for 'file://...' URLs.`);
		}

		// Open the file, and convert to ReadableStream
		const file = await Deno.open(url, { read: true }).catch((err) => {
			if (err instanceof Deno.errors.NotFound) {
				return undefined;
			} else {
				throw err;
			}
		});
		if (!file) {
			return new Response('404 not found', { status: 404 });
		}
		const body = new ReadableStream<Uint8Array>({
			start: async (controller) => {
				for await (const chunk of iter(file)) {
					controller.enqueue(chunk.slice(0));
				}
				file.close();
				controller.close();
			},
			cancel() {
				file.close();
			},
		});

		// Get meta information
		const headers = new Headers();
		const contentType = lookup(url.pathname);
		if (contentType) {
			headers.set('content-type', contentType);
		}
		const info = await Deno.stat(url);
		if (info.mtime) {
			headers.set('last-modified', info.mtime.toUTCString());
		}
		if (info.size != null) {
			headers.set('content-length', info.size.toString());
		}

		// Create 200 streaming response
		const response = new Response(body, { status: 200, headers });
		Object.defineProperty(response, 'url', {
			get() {
				return url;
			},
			configurable: true,
			enumerable: true,
		});
		return response;
	} else if (url.protocol !== 'http:' && url.protocol !== 'https:') {
		// ToDO: determine if there is stdout output (vs an error) before piping
		// * ref: <https://stackoverflow.com/questions/31844316/node-js-check-if-stream-has-error-before-piping-response>
		// ref: <https://medium.com/deno-the-complete-reference/a-beginners-guide-to-streams-in-deno-760d51750763>
		// ref: <https://flaviocopes.com/stream-api> @@ <https://archive.is/ut0Ap>
		// ref: <https://stackoverflow.com/questions/43192126/node-streams-wait-until-data-is-available>
		// ref: <https://nodejs.org/api/stream.html>
		const p = (() => {
			try {
				return Deno.run({
					// -# == display progress as a hashed bar and percentage complete (* could be used to track progress if/when needed)
					// --fail == fail "silently" (no stdout output; error is displayed on stderr and error code is returned as process status)
					// --location == follow redirects
					// --no-progress-meter == don't display progress during download
					// --silent == quiet mode (includes '--no-progress-meter')
					cmd: ['curl', '--fail', '--location', '--no-progress-meter', url.href],
					stdin: 'null',
					stderr: 'piped',
					stdout: 'piped',
				});
			} catch (_error) {
				throw new Error(`Protocol '${url.protocol}' requires \`curl\` (try installing \`curl\`)`);
			}
		})();
		const promise = await Promise.any([p.status(), p.output()]);
		if (
			(isDenoProcessStatus(promise) && promise.code != 0) ||
			(promise instanceof Uint8Array && promise.length === 0)
		) {
			// ToDO: (if needed) explore more fine-tuned failure responses for specific `curl` failure codes
			return new Response(
				`\`curl\` failed; (${(await p.status()).code}; ${
					new TextDecoder().decode(await p.stderrOutput())
				})`,
				{ status: 404 },
			);
		}
		const output = (promise instanceof Uint8Array) ? promise : new Uint8Array();
		const headers = new Headers();
		const contentType = lookup(url.pathname);
		if (contentType) {
			headers.set('content-type', contentType);
		}
		const response = new Response(readableStreamFromIterable([output]), { status: 200, headers });
		Object.defineProperty(response, 'url', {
			get() {
				return url;
			},
			configurable: true,
			enumerable: true,
		});
		return response;
	}

	return originalFetch(input, init);
}

export { fetch };
