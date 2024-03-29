import type { JsPlugin } from '@farmfe/core'
import type { TsConfigJson } from 'type-fest'
import { parse } from 'jsonc-parser'
import { readFileSync } from 'node:fs'
import path from 'node:path'

export default function tsPathPlugin(): JsPlugin {
  return {
    name: 'ts-config-plugin',
    config(config) {
      if (!config) {
        return config
      }

      const tsConfig: TsConfigJson = parse(
        readFileSync(path.join(process.cwd(), './tsconfig.json'), 'utf-8')
      )

      const baseUrl = tsConfig.compilerOptions?.baseUrl ?? ''
      const root = config.root ?? process.cwd()
      config.root = path.resolve(root, baseUrl)

      const paths = tsConfig.compilerOptions?.paths ?? {}
      const trimWildcard = (str: string) => str.replace(/\/\*$/, '')
      const alias: Record<string, string> = {}
      for (const key in paths) {
        // farm does not support multiple path, so just use the first one
        alias[trimWildcard(key)] = path.resolve(
          root,
          trimWildcard(paths[key][0])
        )
      }

      if (!config.compilation) config.compilation = {}
      if (!config.compilation.resolve) config.compilation.resolve = {}
      config.compilation.resolve.alias = Object.assign(
        alias,
        config.compilation.resolve.alias
      )

      return config
    },
  }
}
