import fs from 'fs'
import { join, resolve } from 'path'
import type { Plugin } from 'vite'
import type { OutputAsset } from 'rollup'
import { uniq } from '@bryce-loskie/utils'

const TagReg = /\<van-(\w+)/gmi

interface ICtx {
  srcLibDir: string
  componentMap: Record<string, Set<string>>
}

export const transform = (code: string, id: string, ctx: ICtx) => {
  if (!id.endsWith('.vue'))
    return

  const keyRE = /src\/([\w\/.]*)\.vue$/i
  const key = keyRE.exec(id)?.[1]

  if (!key || key === 'App')
    return

  TagReg.lastIndex = 0
  const matches = code.matchAll(TagReg)

  const components = new Set<string>()
  for (const match of matches)
    components.add(match[1])

  ctx.componentMap[key] = components
  return code
}

const removeExt = (filePath: string) => {
  return filePath.replace(/\.[^\/.]+$/, '')
}

const applyComponents = (components: Set<string>, source: string): string => {
  const oldJson = JSON.parse(source)
  const oldUsingComponents = oldJson.usingComponents || {}
  const newUsingComponents = {}
  for (const c of components)
    newUsingComponents[`van-${c}`] = `/wxcomponents/vant/${c}/index`

  oldJson.usingComponents = { ...oldUsingComponents, ...newUsingComponents }
  return JSON.stringify(oldJson, null, 2)
}

const copyRecursiveSync = (src: string, dest: string) => {
  if (!fs.existsSync(src))
    return

  if (fs.existsSync(dest))
    return

  const stats = fs.statSync(src)
  const isDirectory = stats.isDirectory()

  if (isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(join(src, childItemName),
        join(dest, childItemName))
    })
  }
  else {
    fs.copyFileSync(src, dest)
  }
}

const cwd = process.cwd()

export const UniAppVantAutoImport = (): Plugin => {
  const ctx: ICtx = {
    srcLibDir: resolve(cwd, 'node_modules/@vant/weapp/lib'),
    componentMap: {},
  }

  const BaseComponents = ['icon', 'loading', 'info', 'common', 'wxs', 'mixins']

  return {
    name: 'vite-uni-app-vant-auto-import',
    enforce: 'pre',
    transform(code, id) {
      return transform(code, id, ctx)
    },
    generateBundle(options, bundle, isWrite) {
      if (!isWrite)
        return

      const pageJsonBundles = uniq(Object.keys(bundle)
        .filter(key => /^pages.*\.js(on)?$/i.test(key))
        .map(key => removeExt(key)))
        .map(item => `${item}.json`)

      for (const name of pageJsonBundles) {
        const rawBundle = bundle[name]
        if (!rawBundle)
          continue

        const { fileName, source, type } = rawBundle as OutputAsset
        if (type !== 'asset' || typeof source !== 'string')
          continue

        const key = removeExt(fileName)
        const components = ctx.componentMap[key]
        if (!components)
          continue

        const newSource = applyComponents(components, source)

        // @ts-expect-error ignore this line
        rawBundle.source = newSource
      }

      // Copy components to wxcomponents/vant
      const dir = options.dir
      if (!dir)
        return

      const targetDir = resolve(dir, 'wxcomponents/vant')
      if (!fs.existsSync(targetDir))
        fs.mkdirSync(targetDir, { recursive: true })

      const { srcLibDir, componentMap } = ctx

      const usedComponents = Object.values(componentMap).flatMap(c => [...c])

      const allComponents = new Set([...usedComponents, ...BaseComponents])

      for (const c of allComponents) {
        const srcDir = resolve(srcLibDir, c)
        const destDir = resolve(targetDir, c)
        copyRecursiveSync(srcDir, destDir)
      }

      // this.emitFile({
      //   type: 'asset',
      //   fileName: 'wxcomponents/vant/foo.txt',
      //   source: 'asdfasdf',
      // })
      // return undefined
    },
  }
}
