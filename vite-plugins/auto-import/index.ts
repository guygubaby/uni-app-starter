import { resolve } from 'path'
import { existsSync } from 'fs'
import type { Plugin } from 'vite'
import type { ICtx } from './types'
import { copyComponents, handleHotUpdate, transformV2, changeJson as updateJson } from './utils'

const cwd = process.cwd()

export const UniAppVantAutoImport = (): Plugin => {
  const ctx: ICtx = {
    srcLibDir: resolve(cwd, 'node_modules/@vant/weapp/lib'),
    componentMap: {},
  }

  if (!existsSync(ctx.srcLibDir))
    throw new Error('@vant/weapp is not installed')

  let isFirstTime = true

  return {
    name: 'vite-uni-app-vant-auto-import',
    enforce: 'pre',
    transform(code, id) {
      return transformV2(code, id, ctx)
    },
    generateBundle(options, bundle, isWrite) {
      if (!isWrite)
        return

      if (isFirstTime) {
        updateJson(bundle, ctx)
        isFirstTime = false
      }
      else {
        handleHotUpdate(options.dir!, ctx)
      }

      copyComponents(options.dir!, ctx)
    },
  }
}
