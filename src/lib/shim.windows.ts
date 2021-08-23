// spell-checker:ignore (vars) ARGX

const cmdShimBase = `% \`<%=shimBinName%>\` (*enhanced* Deno CMD shim; by \`dxi\`) %
@rem:: spell-checker:ignore (shell/CMD) COMSPEC ERRORLEVEL ; (deno) hrtime ; (bin) <%=shimBinName%> <%=denoRunTarget%>
@set "ERRORLEVEL="
@set "DENO_SHIM_ERRORLEVEL="
@setLocal
@set "DENO_SHIM_PIPE="
@set "DENO_SHIM_ARGS="
@set "DENO_SHIM_ARGX="
@set "DENO_SHIM_URL="
@:...prep...
@:launch
@rem:: DENO_SHIM_EXEC convolution is to avoid \`%*\` within the final parse group [o/w paren args cause parsing misbehavior]
@>>"%DENO_SHIM_EXEC%" echo @set DENO_SHIM_ARGS=%*
@>>"%DENO_SHIM_EXEC%" echo @goto _undef_ 2^>NUL ^|^| @for %%%%G in ("%COMSPEC%") do @title %%%%~nG ^& @deno.exe "run" <%= denoRunOptions ? (denoRunOptions + ' ') : '' %>-- <%=denoRunTarget%> %%DENO_SHIM_ARGS%%
@(
@goto _undef_ 2>NUL
@for %%G in ("%COMSPEC%") do @title %%~nG
@set "DENO_SHIM_EXEC=%DENO_SHIM_EXEC%"
@set "DENO_SHIM_PIPE=%DENO_SHIM_PIPE%"
@set DENO_SHIM_ARG0=%~0
@set DENO_SHIM_URL=<%=denoRunTarget%>
@call "%DENO_SHIM_EXEC%"
@call set DENO_SHIM_ERRORLEVEL=%%ERRORLEVEL%%
@if EXIST "%DENO_SHIM_PIPE%" call "%DENO_SHIM_PIPE%" >NUL 2>NUL
@if EXIST "%DENO_SHIM_EXEC%" if NOT DEFINED DENO_SHIM_DEBUG del /q "%DENO_SHIM_EXEC%" 2>NUL
@if EXIST "%DENO_SHIM_PIPE%" if NOT DEFINED DENO_SHIM_DEBUG del /q "%DENO_SHIM_PIPE%" 2>NUL
@set "DENO_SHIM_EXEC="
@set "DENO_SHIM_PIPE="
@set "DENO_SHIM_ARG0="
@set "DENO_SHIM_ARGS="
@set "DENO_SHIM_ARGX="
@set "DENO_SHIM_URL="
@call %COMSPEC% /d/c "exit %%DENO_SHIM_ERRORLEVEL%%"
)
`;
const cmdShimPrepPipe = `@:pipeEnabled
@:prep
@set "RANDOM=" &:: remove any cloak from dynamic variable RANDOM
@if NOT DEFINED TEMP @set TEMP=%TMP%
@if NOT EXIST "%TEMP%" @set TEMP=%TMP%
@if NOT EXIST "%TEMP%" @goto :launch
@set DENO_SHIM_TID=%RANDOM%.%RANDOM%.%RANDOM%
@set DENO_SHIM_EXEC=%TEMP%\\<%=shimBinName%>.shim.exec.%DENO_SHIM_TID%.cmd
@set DENO_SHIM_PIPE=%TEMP%\\<%=shimBinName%>.shim.pipe.%DENO_SHIM_TID%.cmd
@if EXIST "%DENO_SHIM_EXEC%" @goto :prep
@if EXIST "%DENO_SHIM_PIPE%" @goto :prep
@if DEFINED DENO_SHIM_EXEC echo @rem \`<%=shimBinName%>\` shell exec > "%DENO_SHIM_EXEC%"
@if DEFINED DENO_SHIM_PIPE echo @rem \`<%=shimBinName%>\` shell pipe > "%DENO_SHIM_PIPE%"`;
const cmdShimPrepNoPipe = `@:pipeDisabled
@:prep
@set "RANDOM=" &:: remove any cloak from dynamic variable RANDOM
@if NOT DEFINED TEMP @set TEMP=%TMP%
@if NOT EXIST "%TEMP%" @set TEMP=%TMP%
@if NOT EXIST "%TEMP%" @goto :launch
@set DENO_SHIM_TID=%RANDOM%.%RANDOM%.%RANDOM%
@set DENO_SHIM_EXEC=%TEMP%\\<%=shimBinName%>.shim.exec.%DENO_SHIM_TID%.cmd
@if EXIST "%DENO_SHIM_EXEC%" @goto :prep
@if DEFINED DENO_SHIM_EXEC echo @rem \`<%=shimBinName%>\` shell exec > "%DENO_SHIM_EXEC%"`;

export function cmdShimTemplate(enablePipe: boolean) {
	return cmdShimBase.replace('@:...prep...', enablePipe ? cmdShimPrepPipe : cmdShimPrepNoPipe);
}

export function shimInfo(contentsOriginal: string) {
	// heuristic match for enhanced shim
	// spell-checker:ignore () ined
	const isEnhanced = contentsOriginal.match(/goto\s+[\W_]*undef(?:ined)?[\W_]*\s+2\s*>\s*NUL/i) ||
		contentsOriginal.match(/shim\s*;\s*by\s*`?dxi`?/i);

	const reMatchArray = contentsOriginal.match(
		// eg, `@deno run "--allow-..." ... "https://deno.land/x/denon/denon.ts" %*`
		/^(.*?)@\x22?deno(?:[.]exe)?\x22?\s+\x22?run\x22?\s+(.*\s+)?(\x22[^\x22]*\x22)\s+%*.*$/m,
	) || [];
	const [_match, _denoCommandPrefix, denoRunOptionsRaw, denoRunTarget] = reMatchArray;

	// import * as Semver from 'https://deno.land/x/semver@v1.4.0/mod.ts';

	const denoRunOptions = (denoRunOptionsRaw || '')
		.replace(/((^|\s+)\x22?--\x22?)+(\s|$)/g, ' ') // remove any "--" (quoted or not); avoids collision with "--" added by template
		.replace(/^\s+/m, '') // remove leading whitespace
		.replace(/\s+$/m, '') // remove trailing whitespace
		// .replace(/--allow-plugin/m, Semver.lt(Deno.version.deno, '1.13.0') ? '--allow-plugin' : '--allow-ffi') // repairs breaking change from deno v1.12 to v1.13; ref: https://github.com/denoland/deno/issues/11819
		.replace(/--allow-plugin/m, '--allow-all') // (less secure but works for all deno version) repairs breaking change from deno v1.12 to v1.13; ref: https://github.com/denoland/deno/issues/11819
		.toString();

	return { isEnhanced, denoRunOptions, denoRunTarget };
}
