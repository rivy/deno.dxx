const zip = <T extends string | number | symbol, U>(a: T[], b: U[]) => {
	const c: Record<T, U> = {} as Record<T, U>;
	a.map((e: T, idx: number) => c[e] = b[idx]);
	return c;
};

export const permitsAsync =
	(async (
		names: Deno.PermissionName[] = ['env', 'ffi', 'hrtime', 'net', 'read', 'run', 'write'],
	) => {
		const permits: Record<Deno.PermissionName, Deno.PermissionStatus> = zip(
			names,
			(await Promise.all(names.map((name) => Deno.permissions?.query({ name })))).map((e) =>
				e ?? { state: 'granted', onchange: null }
			),
		);
		return permits;
	});

const atImportPermissions = await permitsAsync();

// `env()`
/** Return the value of the environment variable `varName` (or `undefined` if non-existent or not-allowed access).
 * - will *not panic*
 * - will *not prompt* for permission if `options.guard` is `true`
@param `options``.guard` • verify unrestricted environment access permission *at time of module import* prior to access attempt (avoids Deno prompts/panics); defaults to `true`
 */
export function env(varName: string, options?: { guard: boolean }) {
	const guard = (options != null) ? options.guard : true;
	const useDenoGet = !guard || (atImportPermissions.env.state === 'granted');
	try {
		return useDenoGet ? Deno.env.get(varName) : undefined;
	} catch (_) {
		return undefined;
	}
}
