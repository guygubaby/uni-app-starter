import fs from 'fs'
import { join, resolve } from 'path'
import type { OutputAsset, OutputBundle } from 'rollup'
import { compileTemplate, parse } from 'vue/compiler-sfc'
import { BaseComponents, TagReg } from './constants'
import type { ICtx } from './types'

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

export const transformV2 = (code: string, id: string, ctx: ICtx) => {
  if (!id.endsWith('.vue'))
    return

  const keyRE = /src\/([\w\/.]*)\.vue$/i
  const key = keyRE.exec(id)?.[1]

  if (!key || key === 'App')
    return

  if (!code.includes('van-'))
    return

  const { descriptor } = parse(code, {
    filename: id,
  })

  const { template } = descriptor

  if (!template)
    return

  const t = compileTemplate({
    id,
    filename: id,
    isProd: true,
    source: template.content,
  })

  const components = (t.ast?.components || [])
    .map(c => c.replace(/^van-/, ''))

  ctx.componentMap[key] = new Set(components)
}

const removeExt = (filePath: string) => {
  return filePath.replace(/\.[^\/.]+$/, '')
}

const applyComponents = (components: Set<string>, source: string, prune = false): string => {
  const oldJson = JSON.parse(source)
  const oldUsingComponents = oldJson.usingComponents || {}
  const newUsingComponents = {}
  for (const c of components)
    newUsingComponents[`van-${c}`] = `/wxcomponents/vant/${c}/index`

  oldJson.usingComponents = prune ? newUsingComponents : { ...oldUsingComponents, ...newUsingComponents }
  return JSON.stringify(oldJson, null, 2)
}

export const copyComponents = (dir: string, ctx: ICtx) => {
  // Copy components to wxcomponents/vant
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
}

export const changeJson = (bundle: OutputBundle, ctx: ICtx) => {
  const pageJsonBundles = Object.keys(bundle)
    .filter(key => /^pages.*\.json$/i.test(key))

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
}

export const handleHotUpdate = (dir: string, ctx: ICtx) => {
  if (!dir)
    return

  const { componentMap } = ctx

  Object.entries(componentMap)
    .forEach(([file, components]) => {
      const jsonFile = resolve(dir, `${file}.json`)

      if (!fs.existsSync(jsonFile))
        return
      const source = fs.readFileSync(jsonFile, 'utf8')
      const newSource = applyComponents(components, source, true)
      fs.writeFileSync(jsonFile, newSource)
    })
}
