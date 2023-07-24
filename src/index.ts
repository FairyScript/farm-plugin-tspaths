import type { JsPlugin } from '@farmfe/core'
import type { TsConfigJson } from 'type-fest'
import { parse } from 'jsonc-parser'
import fs from 'node:fs'
import path from 'node:path'

const tsConfigPlugin: JsPlugin = {
  name: 'ts-config-plugin',
  config(param) {
    if (!param) {
      return param
    }

    const tsConfig: TsConfigJson = parse(
      fs.readFileSync('./tsconfig.json', 'utf-8')
    )
    const baseUrl = tsConfig.compilerOptions?.baseUrl ?? ''
    const root = param.root ?? process.cwd()
    const paths = tsConfig.compilerOptions?.paths ?? {}
    const trimWildcard = (str: string) => str.replace(/\/\*$/, '')
    let alias: Record<string, string> = {}
    for (const key in paths) {
      // farm does not support multiple path, so just use the first one
      alias[trimWildcard(key)] = path.resolve(root, trimWildcard(paths[key][0]))
    }
    alias = Object.assign(alias, param.resolve?.alias ?? {})

    param.root = path.resolve(root, baseUrl)
    param.resolve = Object.assign(param.resolve ?? {}, { alias })
    return param
  },
}

export default tsConfigPlugin
