/* global Deno */

import { posix } from 'https://deno.land/std@0.159.0/path/mod.ts'
import { sprintf } from 'https://deno.land/std@0.159.0/fmt/printf.ts'

export default {
  fs: {
    readFileSync: (path: string) => {
      try {
        return Deno.readTextFileSync(path)
      } catch (err) {
        // simulate the same error as Node.js (ErrnoException), so that it can be caught by the same caller code
        const e = new Error(`ENOENT: no such file or directory, open '${path}'`, {
          cause: err,
        }) as Error & { code?: string; errno?: number; path?: string; syscall?: string }
        e.code = 'ENOENT'
        e.errno = -4058
        e.syscall = 'sysopen'
        e.path = path
        throw e
      }
    },
    writeFile: Deno.writeFile
  },
  format: sprintf,
  resolve: (base: string, p1: string, p2: string) => {
    try {
      return posix.resolve(base, p1, p2)
    } catch (err) {
      // Most likely we simply don't have --allow-read set.
    }
  },
  exists: (file: string) => {
    try {
      return Deno.statSync(file).isFile
    } catch (err) {
      return false
    }
  }
}
