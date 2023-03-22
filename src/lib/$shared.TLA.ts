//== * SHARED project exports (requiring TLA)
// TLA == a TLA (three-letter-abbreviation) for "top level await"
// * modules with TLA will not be initialized in strict static load order ; load/init will occur after the end of the static modules loads
// ... discussions related to TLA issues can be found at <https://github.com/denoland/deno/discussions/15356> , <https://github.com/denoland/deno_std/issues/2446> , <https://github.com/denoland/deno/issues/13730>
// ... see <https://github.com/denoland/deno/issues/13730#issuecomment-1207325451> for notes about less rigorous module load/execution order

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
