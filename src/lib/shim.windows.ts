// spell-checker:ignore (vars) ARGX

const cmdShimBase = `% \`<%=shimName%>\` (*enhanced* Deno CMD shim; by <%=appNameVersion%>) %
@rem:: spell-checker:ignore (shell/CMD) COMSPEC ERRORLEVEL delims ; (deno) Deno hrtime ; (bin) <%=shimName%> <%=denoRunTarget%>
@rem
@if DEFINED SHIM_DEBUG @echo # SHIM_DEBUG='%SHIM_DEBUG%' ## defined and active 1>&2
@rem
@set "ERRORLEVEL=" &@:: reset ERRORLEVEL (defensive de-cloaking to avoid any prior pinned value)
@set "SHIM_ERRORLEVEL=" &@:: SHIM_ERRORLEVEL is used to report final ERRORLEVEL (and ultimately reset to null); * side-effect of proper return of script to process error level
@setLocal
@rem
@rem:: escape closing parentheses to prevent parsing issues in the final parse group
@rem:: - ref: [SO ~ Escaping parentheses...](https://stackoverflow.com/questions/12976351/escaping-parentheses-within-parentheses-for-batch-file) @@ https://archive.is/biqAW
@rem:: * leading '.' is to avoid empty SHIM_ARGS which won't be manipulated correctly by the expansion string substitutions
@set SHIM_ARGS=.%*
@set SHIM_ARGS=%SHIM_ARGS:)=^^^)%
@rem
@set "SHIM_PIPE="
@set "SHIM_TARGET="
@:...prep...
@(
@(goto) 2>NUL
@for %%G in ("%COMSPEC%") do @title %%~nG
@set "SHIM_PIPE=%SHIM_PIPE%"
@set "SHIM_ARG0=%~0"
@REM * set SHIM_ARGS_PREFIX=<%= denoRunTargetArgs ? (denoRunTargetArgs + ' ') : '' %>&:: ## *DISABLED* as not needed; incorporated directly into \`deno run ...\` command
@rem:: reverse parentheses escaping and remove added leading '.'
@set SHIM_ARGS=%SHIM_ARGS:^^^)=)%
@call set SHIM_ARGS=%%SHIM_ARGS:~1%%
@set "SHIM_TARGET=<%=denoRunTarget%>"
@REM @rem:: suppress default [ugly UI/UX] prompting behavior in favor of panics for insufficient permissions ## *DISABLED* for user choice [use \`--no-prompt\` instead]
@REM * @set "DENO_NO_PROMPT=1"
@rem:: suppress annoying/distracting/useless-for-non-dev Deno update check/notification
@set "DENO_NO_UPDATE_CHECK=1"
@rem:: suppress annoying/distracting/useless-for-non-dev Deno deprecation warnings [undocumented; warnings and var included in Deno v1.40+]
@set "DENO_NO_DEPRECATION_WARNINGS=1"
@call deno "run" <%= denoRunOptions ? (denoRunOptions + ' ') : '' %>-- "<%=denoRunTarget%>" <%= denoRunTargetArgs ? (denoRunTargetArgs + ' ') : '' %>%%SHIM_ARGS%%
@call set SHIM_ERRORLEVEL=%%ERRORLEVEL%%
@rem:: reset DENO_NO_... ENV suppression vars to prior values
@REM * @set "DENO_NO_PROMPT=%DENO_NO_PROMPT%"
@set "DENO_NO_UPDATE_CHECK=%DENO_NO_UPDATE_CHECK%"
@set "DENO_NO_DEPRECATION_WARNINGS=%DENO_NO_DEPRECATION_WARNINGS%"
@if EXIST "%SHIM_PIPE%" call "%SHIM_PIPE%" >NUL 2>NUL
@if EXIST "%SHIM_PIPE%" if NOT DEFINED SHIM_DEBUG del /q "%SHIM_PIPE%" 2>NUL
@set "SHIM_PIPE="
@set "SHIM_ARG0="
@set "SHIM_ARGS="
@set "SHIM_TARGET="
@if DEFINED SHIM_DEBUG @call echo # SHIM_ERRORLEVEL='%%SHIM_ERRORLEVEL%%' 1>&2
@for /f %%G in ('echo %%SHIM_ERRORLEVEL%%') do @(set "SHIM_ERRORLEVEL=" & "%COMSPEC%" /d/c "@exit %%G")
)
`;
const cmdShimPrepPipe = `@:pipeEnabled
@set "RANDOM=" &@:: reset RANDOM (dynamic variable; defensive de-cloaking to avoid any prior pinned value)
@set "TIME=" &@:: reset TIME (dynamic variable; defensive de-cloaking of any prior pinned value)
@set "DATE=" &@:: reset DATE (dynamic variable; defensive de-cloaking of any prior pinned value)
@if NOT EXIST "%TEMP%" @set "TEMP=%TMP%"
@if NOT EXIST "%TEMP%" @set "TEMP=."
@:prep
@:create_unique_tid
@:: TID == TargetID; unique identifier for the shim target (avoids file system overwrite conflicts for concurrent executions)
@for /f "tokens=1,2,3,4 delims=/ " %%G in ("%DATE%") do @set "SHIM_TID=$shim_tid-%%J%%H%%I.%TIME::=%-%RANDOM%$" &@:: $shim_tid-YYYYMMDD.HHMMSS.ss-NNNNN$
@set "SHIM_TID=%SHIM_TID: =0%" &:: replace any spaces with '0' (avoids issues with spaces in path; eg, for times between 0:00 and 9:59)
@set "SHIM_PIPE=%TEMP%\\<%=shimName%>.%SHIM_TID%.$shim_pipe$.cmd"
@if EXIST "%SHIM_PIPE%" @goto :prep
@if DEFINED SHIM_PIPE @> "%SHIM_PIPE%" echo % \`<%=shimName%>\` shell pipe %
@if DEFINED SHIM_PIPE @if DEFINED SHIM_DEBUG @echo # SHIM_PIPE='%SHIM_PIPE%' 1>&2`;
const cmdShimPrepNoPipe = '@:pipeDisabled';

export function cmdShimTemplate(enablePipe: boolean) {
	return cmdShimBase.replace('@:...prep...', enablePipe ? cmdShimPrepPipe : cmdShimPrepNoPipe);
}

export function shimInfo(contentsOriginal: string) {
	// heuristic match for enhanced shim
	// spell-checker:ignore () ined
	const isEnhanced =
		contentsOriginal.match(/goto\s+[\W_]*undef(?:ined)?[\W_]*\s+2\s*>\s*NUL/i) ||
		contentsOriginal.match(/\(\s*goto\s*\)\s+2\s*>\s*NUL/i) ||
		contentsOriginal.match(/shim\s*;\s*by\s*`?dxi`?/i);

	const reMatchArray = contentsOriginal.match(
		// match `deno run` options, run-target (as a URL-like quoted string), and run-target arguments from shim text
		// * run-target is matched as the first double-quoted URL-like (like "<scheme>:...") argument
		// eg, `deno install ...` => `@deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %*`
		// eg, `dxi ...` => `... @deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %%SHIM_ARGS%%`
		/^(.*?)?(\x22?deno(?:[.]exe)?\x22?)\s+\x22?run\x22?\s+(.*\s+)?([\x22](?:[a-z][a-z0-9+.-]+:[^\x22]+)[\x22]|[\x27](?:[a-z][a-z0-9+.-]+:[^\x27]+)[\x27])\s+(?:(.*?)\s*(?:\x22[$]@\x22|%[*]|%%(?:DENO_)?SHIM_ARGS%%))\s*$/m,
	);
	const [
		_match,
		denoCommandPrefix,
		denoCommand,
		denoRunOptionsRaw,
		denoRunTargetQuoted,
		denoRunTargetArgs,
	] = reMatchArray ?? ([] as (string | undefined)[]);

	// import * as Semver from 'https://deno.land/x/semver@v1.4.0/mod.ts';

	const denoRunTarget = denoRunTargetQuoted?.replace(/^[\x22\x27](.*?)[\x22\x27]$/, '$1');

	let denoRunOptions = denoRunOptionsRaw;
	if (denoRunOptions != null && denoRunOptions.length > 0) {
		denoRunOptions = denoRunOptions
			.replace(/(?<=^|\s+)[\x22\x27]?--[\x22\x27]?(?=\s+|$)/gm, '') // remove any "--" (quoted or not); avoids collision with "--" added by template
			.toString();

		// change purposeful use of unstable flags to `--allow-all`
		// * repairs breaking change from deno v1.12 to v1.13; ref: https://github.com/denoland/deno/issues/11819
		// const usingUnstable = denoRunOptions.match(/(^|\s+)[\x22\x27]?--unstable\b/ms);
		denoRunOptions = denoRunOptions
			?.replace(/(?<=^|\s+)[\x22\x27]?--allow-plugin[\x22\x27]?(?=\s+|$)/gm, '"--allow-all"') // deno <= v1.12
			.replace(/(?<=^|\s+)[\x22\x27]?--allow-ffi[\x22\x27]?(?=\s+|$)/gm, '"--allow-all"') // deno >= v1.13
			.toString();

		// summarize flags/options for `--allow-all` or (unrestricted) `--allow-run`
		if (denoRunOptions.match(/(?<=^|\s)[\x22\x27]?--allow-(all|run)(?:[\x22\x27]|\s|$)/m)) {
			denoRunOptions = [
				'"--allow-all"',
				denoRunOptions.replace(
					/(?<=^|\s)[\x22\x27]?--allow-\S+(?:=.*?[\x22\x27]|[\x22\x27]|\s|$)/g,
					'',
				),
			]
				.filter(Boolean)
				.join(' ');
		}

		denoRunOptions = denoRunOptions
			.replace(/^\s+/m, '') // remove leading whitespace
			.replace(/\s+$/m, '') // remove trailing whitespace
			.toString();
	}

	return {
		isEnhanced,
		denoCommandPrefix,
		denoCommand,
		denoRunOptions,
		denoRunTargetQuoted,
		denoRunTarget,
		denoRunTargetArgs,
	};
}
