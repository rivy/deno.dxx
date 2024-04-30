/** The combination of location information about the line that was executing at the time */
export interface Location {
    /** the location of the line that was executing at the time */
    line: number;
    /** the location of the character that was executing at the time */
    char: number;
    /** the method name that was executing at the time */
    method: string;
    /** the file path that was executing at the time */
    file: string;
}
/**
 * If provided, continue skipping until:
 *
 * 1. The file or method is found
 * 2. Once found, will continue until neither the file nor method are found anymore
 * 3. Once exited, the frame offset will then apply
 *
 * If you wish to capture the found method or the file, combine them with `frames: -1` or `immediate: true`.
 *
 * If you wish for more customisation than this, create an issue requesting passing a custom skip handler function, as more variance to this interface is too much customisation complexity.
 */
export interface Offset {
    /**
     * if provided, continue until a method containing or matching this string is exited
     * if provided alongside a file, will continue until neither the file nor method are found
     * this allows file and method to act as fallbacks for each other, such that if one is not found, it doesn't skip everything
     */
    method?: RegExp | string | null;
    /**
     * if provided, continue until a file containing or matching this string is exited
     * if provided alongside a method, will continue until neither the file nor method are found
     * this allows file and method to act as fallbacks for each other, such that if one is not found, it doesn't skip everything
     */
    file?: RegExp | string | null;
    /**
     * once we have satisfied the found condition, if any, then apply this index offset to the frames
     * e.g. 1 would mean next frame, and -1 would mean the previous frame
     * Use -1 to go back to the found method or file
     */
    frames?: number;
    /**
     * once we have satisfied the found condition, should we apply the frame offset immediately, or wait until the found condition has exited
     */
    immediate?: boolean;
}
/**
 * For an error instance, return its stack frames as an array.
 */
export declare function getFramesFromError(error: Error): Array<string>;
/**
 * Get the locations from a list of error stack frames.
 */
export declare function getLocationsFromFrames(frames: Array<string>): Array<Location>;
/**
 * From a list of locations, get the location that is determined by the offset.
 * If none are found, return the failure location
 */
export declare function getLocationWithOffset(locations: Array<Location>, offset: Offset): Location;
/**
 * Get the file path that appears in the stack of the passed error.
 * If no offset is provided, then the first location that has a file path will be used.
 */
export declare function getFileFromError(error: Error, offset?: Offset): string;
/**
 * Get first determined location information that appears in the stack of the error.
 * If no offset is provided, then the offset used will determine the first location information.
 */
export declare function getLocationFromError(error: Error, offset?: Offset): Location;
/**
 * Get the location information about the line that called this method.
 * If no offset is provided, then continue until the caller of the `getCurrentLine` is found.
 * @example Input
 * ``` javascript
 * console.log(getCurrentLine())
 * ```
 * @example Result
 * ``` json
 * {
 * 	"line": "1",
 * 	"char": "12",
 * 	"method": "Object.<anonymous>",
 * 	"file": "/Users/balupton/some-project/calling-file.js"
 * }
 * ```
 */
export default function getCurrentLine(offset?: Offset): Location;
//# sourceMappingURL=index.d.ts.map
