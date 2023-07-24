import type { UserConfig } from '@farmfe/core'

function defineConfig(config: UserConfig) {
  return config
}

import { builtinModules } from 'module'

export default defineConfig({
  compilation: {
    input: {
      index: './src/index.ts',
    },
    output: {
      path: 'build',
      entryFilename: '[entryName].cjs',
      targetEnv: 'node',
      format: 'cjs',
    },
    external: [
      ...builtinModules.map(m => `^${m}$`),
      ...builtinModules.map(m => `^node:${m}$`),
      'jsonc-parser',
    ],
    partialBundling: {
      moduleBuckets: [
        {
          name: 'index.js',
          test: ['.+'],
        },
      ],
    },
    minify: false,
    sourcemap: false,
    presetEnv: false,
  },
  server: {
    hmr: false,
  },
})
