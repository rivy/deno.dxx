// consolidated deprecated APIs

// ref: [Deno 1.x to 2.x Migration Guide](https://docs.deno.com/runtime/manual/advanced/migrate_deprecations)

// deno-lint-ignore-file no-namespace

// export const Deprecated = {
// 	// $deprecated: true,
// 	// $deprecated_since: '2023-11-22',
// 	// $deprecated_use_instead: 'src/lib/%24deps.cli.ts',
// 	// $deprecated_reason: 'consolidated deprecated APIs',
// 	// $deprecated_remove_after: '2024-11-22',

// 	Deno: { run: Deno.run, RunOptions: Deno.RunOptions },
// };
import deno = Deno;

export namespace Deprecated {
	export namespace Deno {
		// deprecated since: ...
		// use instead: ...
		// remove with: Deno v2.0.0
		export const close = (rid: number) => deno.close(rid);
		export const isatty = (rid: number) => deno.isatty(rid);
		export const stderr = { rid: deno.stderr.rid };
		export const stdin = { rid: deno.stdin.rid };
		export const stdout = { rid: deno.stdout.rid };
		export const run = deno.run;
	}
}

// export const Adapter = { isTerminal: () => };
