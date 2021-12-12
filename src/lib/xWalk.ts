// spell-checker:ignore (*) xwalk (names) Deno

// ToDO: create new xwalk module
// * improve interface; guarantee no-throw, collect errors?

// Documentation and interface for walk were adapted from Go
// https://golang.org/pkg/path/filepath/#Walk
// Copyright 2009 The Go Authors. All rights reserved. BSD license.
import { $path, assert } from './$deps.ts';
const { basename, join, normalize } = $path;

/** Create WalkEntry for the `path` synchronously */
export function _createWalkEntrySync(path: string): WalkEntry {
	path = normalize(path);
	const name = basename(path);
	let error;
	let info;
	try {
		info = Deno.statSync(path);
	} catch (e) {
		error = e;
		info = undefined;
	}
	return {
		errors: error ? [error] : [],
		path,
		name,
		isFile: info ? info.isFile : false,
		isDirectory: info ? info.isDirectory : false,
		isSymlink: info ? info.isSymlink : false,
	};
}

/** Create WalkEntry for the `path` asynchronously */
export async function _createWalkEntry(path: string): Promise<WalkEntry> {
	path = normalize(path);
	const name = basename(path);
	let info;
	let error;
	try {
		info = await Deno.stat(path);
	} catch (e) {
		error = e;
		info = undefined;
	}
	return {
		errors: error ? [error] : [],
		path,
		name,
		isFile: info ? info.isFile : false,
		isDirectory: info ? info.isDirectory : false,
		isSymlink: info ? info.isSymlink : false,
	};
}

export interface WalkOptions {
	maxDepth?: number;
	includeFiles?: boolean;
	includeDirs?: boolean;
	followSymlinks?: boolean;
	exts?: string[];
	match?: RegExp[];
	skip?: RegExp[];
}

function include(path: string, exts?: string[], match?: RegExp[], skip?: RegExp[]): boolean {
	if (exts && !exts.some((ext): boolean => path.endsWith(ext))) {
		return false;
	}
	if (match && !match.some((pattern): boolean => !!path.match(pattern))) {
		return false;
	}
	if (skip && skip.some((pattern): boolean => !!path.match(pattern))) {
		return false;
	}
	return true;
}

export interface WalkEntry extends Deno.DirEntry {
	path: string;
	errors: Error[];
}

/** Walks the file tree rooted at root, yielding each file or directory in the
 * tree filtered according to the given options. The files are walked in lexical
 * order, which makes the output deterministic but means that for very large
 * directories walk() can be inefficient.
 *
 * Options:
 * - maxDepth?: number = Infinity;
 * - includeFiles?: boolean = true;
 * - includeDirs?: boolean = true;
 * - followSymlinks?: boolean = false;
 * - exts?: string[];
 * - match?: RegExp[];
 * - skip?: RegExp[];
 *
 *       for await (const entry of walk(".")) {
 *         console.log(entry.path);
 *         assert(entry.isFile);
 *       }
 */
export async function* walk(
	root: string,
	{
		maxDepth = Infinity,
		includeFiles = true,
		includeDirs = true,
		followSymlinks = false,
		exts = undefined,
		match = undefined,
		skip = undefined,
	}: WalkOptions = {},
): AsyncIterableIterator<WalkEntry> {
	const errors: Error[] = [];
	// console.warn('xWalk.walk()', { root, options: { match, maxDepth }, CWD: Deno.cwd() });
	if (maxDepth < 0) {
		return;
	}
	if (includeDirs && include(root, exts, match, skip)) {
		yield await _createWalkEntry(root);
	}
	if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
		return;
	}
	try {
		// console.warn('xWalk.walk()', { root, options: { match, maxDepth } });
		for await (const entry of Deno.readDir(root)) {
			assert(entry.name != null);
			let path = join(root, entry.name);

			if (entry.isSymlink) {
				if (followSymlinks) {
					path = await Deno.realPath(path);
				} else {
					continue;
				}
			}

			if (entry.isFile) {
				if (includeFiles && include(path, exts, match, skip)) {
					yield { errors, path, ...entry };
				}
			} else {
				yield* walk(path, {
					maxDepth: maxDepth - 1,
					includeFiles,
					includeDirs,
					followSymlinks,
					exts,
					match,
					skip,
				});
			}
		}
	} catch (_error) {
		/* swallow any Deno.readDir() errors */
		errors.push(_error);
	}
}

/** Same as walk() but uses synchronous ops */
export function* walkSync(
	root: string,
	{
		maxDepth = Infinity,
		includeFiles = true,
		includeDirs = true,
		followSymlinks = false,
		exts = undefined,
		match = undefined,
		skip = undefined,
	}: WalkOptions = {},
): IterableIterator<WalkEntry> {
	const errors: Error[] = [];
	if (maxDepth < 0) {
		return;
	}
	if (includeDirs && include(root, exts, match, skip)) {
		yield _createWalkEntrySync(root);
	}
	if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
		return;
	}
	try {
		for (const entry of Deno.readDirSync(root)) {
			assert(entry.name != null);
			let path = join(root, entry.name);

			if (entry.isSymlink) {
				if (followSymlinks) {
					path = Deno.realPathSync(path);
				} else {
					continue;
				}
			}

			if (entry.isFile) {
				if (includeFiles && include(path, exts, match, skip)) {
					yield { errors, path, ...entry };
				}
			} else {
				yield* walkSync(path, {
					maxDepth: maxDepth - 1,
					includeFiles,
					includeDirs,
					followSymlinks,
					exts,
					match,
					skip,
				});
			}
		}
	} catch (_error) {
		/* swallow any Deno.readDirSync() errors */
		errors.push(_error);
	}
}
