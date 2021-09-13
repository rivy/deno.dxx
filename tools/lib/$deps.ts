export * as Path from 'https://deno.land/std@0.106.0/path/mod.ts';

// import * as fs from 'https://deno.land/std@0.83.0/fs/mod.ts'; // avoid; uses unstable API
import { exists, existsSync } from 'https://deno.land/std@0.106.0/fs/exists.ts';
import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.106.0/fs/expand_glob.ts';
import { walk, walkSync } from 'https://deno.land/std@0.106.0/fs/walk.ts';
export const fs = { exists, existsSync, expandGlob, expandGlobSync, walk, walkSync };
