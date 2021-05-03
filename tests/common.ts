// tests ~ common code

import { Path } from './deps.ts';

export function nameGen(filename: string) {
	return (testName: string) => Path.parse(filename).name + ':' + testName;
}

export function testTemplate(filename: string) {
	const name = nameGen(filename);
	return (description: string, fn: () => void | Promise<void>) => Deno.test(name(description), fn);
}
