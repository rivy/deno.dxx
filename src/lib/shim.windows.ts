// spell-checker:ignore (vars) ARGX

const cmdShimBase = `% \`<%=shimBinName%>\` (*enhanced* Deno CMD shim; by <%=appNameVersion%>) %
@rem:: spell-checker:ignore (shell/CMD) COMSPEC ERRORLEVEL ; (deno) Deno hrtime ; (bin) <%=shimBinName%> <%=denoRunTarget%>
@set "ERRORLEVEL=" &@:: reset ERRORLEVEL (defensive de-cloaking to avoid any prior pinned value)
@set "SHIM_ERRORLEVEL=" &@:: SHIM_ERRORLEVEL, upon script completion, will be equal to final ERRORLEVEL; * side-effect of proper return of process and script error levels
@setLocal
@REM * @set "DENO_NO_PROMPT=1" &:: suppress default (ugly UI/UX) prompting behavior in favor of panics for insufficient permissions; use \`--no-prompt\` instead
@set "DENO_NO_UPDATE_CHECK=1" &:: suppress annoying/distracting/useless-for-non-dev Deno update check/notification
@set "DENO_NO_DEPRECATION_WARNINGS=1" &:: suppress annoying/distracting/useless-for-non-dev Deno deprecation warnings [undocumented; warnings and var included in Deno v1.40+]
@set SHIM_ARGS=%*
@rem:: double '%' characters in SHIM_ARGS; needed for correct output of \`... echo @set SHIM_ARGS=%SHIM_ARGS%\`; used in SHIM_EXEC
@rem:: * delayed expansion is required to double the '%' characters
@setLocal EnableDelayedExpansion
@set SHIM_ARGS=!SHIM_ARGS:%%=%%%%!
@endLocal & set SHIM_ARGS=%SHIM_ARGS%
@rem
@set "SHIM_PIPE="
@set "SHIM_TARGET="
@:...prep...
@:launch
@rem:: use of SHIM_EXEC is a circumlocution to avoid \`%*\` within the later, parentheses-surrounded, final parse group [o/w parentheses within args may cause parsing/execution misbehavior]
@>>"%SHIM_EXEC%" echo @set SHIM_ARGS=%SHIM_ARGS%
@>>"%SHIM_EXEC%" echo @(goto) 2^>NUL ^|^| @for %%%%G in ("%COMSPEC%") do @title %%%%~nG ^& @deno.exe "run" <%= denoRunOptions ? (denoRunOptions + ' ') : '' %>-- "<%=denoRunTarget%>" <%= denoRunTargetPrefixArgs ? (denoRunTargetPrefixArgs + ' ') : '' %>%%SHIM_ARGS%%
@(
@(goto) 2>NUL
@for %%G in ("%COMSPEC%") do @title %%~nG
@set "SHIM_EXEC=%SHIM_EXEC%"
@set "SHIM_PIPE=%SHIM_PIPE%"
@set "SHIM_ARG0=%~0"
@set "SHIM_TARGET=<%=denoRunTarget%>"
@call "%SHIM_EXEC%"
@call set SHIM_ERRORLEVEL=%%ERRORLEVEL%%
@if EXIST "%SHIM_PIPE%" call "%SHIM_PIPE%" >NUL 2>NUL
@if EXIST "%SHIM_EXEC%" if NOT DEFINED SHIM_DEBUG del /q "%SHIM_EXEC%" 2>NUL
@if EXIST "%SHIM_PIPE%" if NOT DEFINED SHIM_DEBUG del /q "%SHIM_PIPE%" 2>NUL
@set "SHIM_EXEC="
@set "SHIM_PIPE="
@set "SHIM_ARG0="
@set "SHIM_ARGS="
@set "SHIM_TARGET="
@%COMSPEC% /d/c "exit %%SHIM_ERRORLEVEL%%" & @set "SHIM_ERRORLEVEL="
)
`;
const cmdShimPrepPipe = `@:pipeEnabled
@set "RANDOM=" &@:: reset RANDOM (dynamic variable; defensive de-cloaking to avoid any prior pinned value)
@set "TIME=" &@:: reset TIME (dynamic variable; defensive de-cloaking of any prior pinned value)
@if NOT EXIST "%TEMP%" @set "TEMP=%TMP%"
@if NOT EXIST "%TEMP%" @set "TEMP=."
@:prep
@set "SHIM_TID=$shim_tid-%TIME::=%-%RANDOM%$" &:: TID = Temp-ID
@set "SHIM_TID=%SHIM_TID: =0%" &:: replace any spaces with '0' (for times between 0000 and 0059; avoids issues with spaces in path)
@set "SHIM_EXEC=%TEMP%\\<%=shimBinName%>.shim.exec.%SHIM_TID%.cmd"
@set "SHIM_PIPE=%TEMP%\\<%=shimBinName%>.shim.pipe.%SHIM_TID%.cmd"
@if EXIST "%SHIM_EXEC%" @goto :prep
@if EXIST "%SHIM_PIPE%" @goto :prep
@if DEFINED SHIM_EXEC echo @rem \`<%=shimBinName%>\` shell exec > "%SHIM_EXEC%"
@if DEFINED SHIM_PIPE echo @rem \`<%=shimBinName%>\` shell pipe > "%SHIM_PIPE%"`;
const cmdShimPrepNoPipe = `@:pipeDisabled
@set "RANDOM=" &:: remove any cloak from dynamic variable RANDOM
@if NOT EXIST "%TEMP%" @set "TEMP=%TMP%"
@if NOT EXIST "%TEMP%" @set "TEMP=."
@:prep
@set "SHIM_TID=%RANDOM%.%RANDOM%.%RANDOM%"
@set "SHIM_EXEC=%TEMP%\\<%=shimBinName%>.shim.exec.%SHIM_TID%.cmd"
@if EXIST "%SHIM_EXEC%" @goto :prep
@if DEFINED SHIM_EXEC echo @rem \`<%=shimBinName%>\` shell exec > "%SHIM_EXEC%"`;

export function cmdShimTemplate(enablePipe: boolean) {
	return cmdShimBase.replace('@:...prep...', enablePipe ? cmdShimPrepPipe : cmdShimPrepNoPipe);
}

export function shimInfo(contentsOriginal: string) {
	// heuristic match for enhanced shim
	// spell-checker:ignore () ined
	const isEnhanced = contentsOriginal.match(/goto\s+[\W_]*undef(?:ined)?[\W_]*\s+2\s*>\s*NUL/i) ||
		contentsOriginal.match(/\(\s*goto\s*\)\s+2\s*>\s*NUL/i) ||
		contentsOriginal.match(/shim\s*;\s*by\s*`?dxi`?/i);

	const reMatchArray = contentsOriginal.match(
		// match `deno run` options, run-target (as a URL-like quoted string), and run-target arguments from shim text
		// * run-target is matched as the first double-quoted URL-like (like "<scheme>:...") argument
		// eg, `deno install ...` => `@deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %*`
		// eg, `dxi ...` => `... @deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %%SHIM_ARGS%%`
		/^(.*?)?\x22?deno(?:[.]exe)?\x22?\s+\x22?run\x22?\s+(.*\s+)?(?:[\x22]([a-z][a-z0-9+.-]+:[^\x22]+)[\x22]|[\x27]([a-z][a-z0-9+.-]+:[^\x27]+))\s+(?:(.*?)\s*(?:\x22$@\x22|%[*]|%%(?:DENO_)?SHIM_ARGS%%))\s*$/m,
	) || [];
	const [
		_match,
		_denoCommandPrefix,
		denoRunOptionsRaw,
		denoRunTarget,
		_denoRunTargetArgs,
		denoRunTargetPrefixArgs,
	] = reMatchArray;

	// import * as Semver from 'https://deno.land/x/semver@v1.4.0/mod.ts';

	let denoRunOptions = denoRunOptionsRaw || '';

	denoRunOptions = denoRunOptions.replace(/(?<=^|\s+)[\x22\x27]?--[\x22\x27]?(?=\s+|$)/gm, '') // remove any "--" (quoted or not); avoids collision with "--" added by template
		.toString();
	7;
	// change purposeful use of unstable flags to `--allow-all`
	// * repairs breaking change from deno v1.12 to v1.13; ref: https://github.com/denoland/deno/issues/11819
	// const usingUnstable = denoRunOptions.match(/(^|\s+)[\x22\x27]?--unstable\b/ms);
	denoRunOptions = denoRunOptions
		.replace(/(?<=^|\s+)[\x22\x27]?--allow-plugin[\x22\x27]?(?=\s+|$)/gm, '"--allow-all"') // deno <= v1.12
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

	return { isEnhanced, denoRunOptions, denoRunTarget, denoRunTargetPrefixArgs };
}
