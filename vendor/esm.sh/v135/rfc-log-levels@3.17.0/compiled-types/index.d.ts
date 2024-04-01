/**
 * The found combination of a log number to its original log name
 */
export interface LevelInfo {
    /** the log level number */
    levelNumber: number;
    /** the log level name */
    levelName: string;
}
/**
 * Mapping of log names to log numbers
 * Aliases should come after names
 */
export interface LevelsMap {
    [name: string]: number;
}
/** Default levels are according to the [RFC Standard](http://www.faqs.org/rfcs/rfc3164.html) */
export declare const rfcLogLevels: LevelsMap;
/**
 * Determine the level number from a level name
 */
export declare function getLevelNumber(name: string, levels?: LevelsMap): number | null;
/**
 * Determine the level name from a level number
 */
export declare function getLevelName(number: number, levels?: LevelsMap): string | null;
/**
 * Receive either the level name or number and return the combination.
 * @param level Either a log name or a log number that is contained within the levels mapping
 * @param levels A mapping of permitted log names to their log numbers to determine the correct log level name and number combination
 * @returns The found combination, which if provided an alias, expands it. If an invalid level was provided, `null` is returned.
 * @example input
 * ``` javascript
 * import getLevelInfo, { rfcLogLevels } from 'rfc-log-levels'
 * getLevelInfo('note')
 * getLevelInfo('note', rfcLogLevels)
 * getLevelInfo('note', { note: 5 })
 * ```
 * @example result
 * ``` json
 * {
 * 	"levelNumber": 5,
 * 	"levelName": "notice"
 * }
 * ```
 */
export default function getLevelInfo(level: string | number, levels?: LevelsMap): LevelInfo | null;
//# sourceMappingURL=index.d.ts.map
