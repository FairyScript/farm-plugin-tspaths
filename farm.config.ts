import { defineConfig } from '@farmfe/core'
import farmDtsPlugin from '@farmfe/js-plugin-dts'

const format = (process.env.FARM_FORMAT as 'esm' | 'cjs') || 'esm'
const ext = format === 'esm' ? 'mjs' : 'cjs'

import { builtinModules } from 'module'

export default defineConfig({
  compilation: {
    input: {
      index: './src/index.ts',
    },
    output: {
      path: `build/${format}`,
      entryFilename: `[entryName].${ext}`,
      targetEnv: 'node',
      format,
    },
    external: [
      ...builtinModules.map(m => `^${m}$`),
      ...builtinModules.map(m => `^node:${m}$`),
      'jsonc-parser',
    ],
    partialBundling: {
      enforceResources: [
        {
          name: 'index',
          test: ['.+'],
        },
      ],
    },
    minify: false,
    sourcemap: false,
    presetEnv: false,
    persistentCache: {
      envs: {
        FARM_FORMAT: format,
      },
    },
  },
  server: {
    hmr: false,
  },
  plugins: [farmDtsPlugin()],
})
