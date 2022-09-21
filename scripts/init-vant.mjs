import { resolve } from 'node:path'
import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const copy = async (src, dest) => {
  const srcStat = await stat(src)
  if (srcStat.isDirectory()) {
    await mkdir(dest, { recursive: true })
    const children = await readdir(src)
    for (const child of children)
      await copy(resolve(src, child), resolve(dest, child))
  }
  else {
    await copyFile(src, dest)
  }
}

const createComponentsRecord = async (files, destDir) => {
  const records = files.reduce((acc, file) => {
    const name = `van-${file}`
    acc[name] = `/wxcomponents/vant/${file}/index`
    return acc
  }, {})

  const components = `${JSON.stringify(records, null, 2)}\n`

  const destFile = resolve(destDir, 'components.json')

  await writeFile(destFile, components, 'utf8')
}

const copyVant = async () => {
  const cwd = process.cwd()
  const srcDir = resolve(cwd, 'node_modules/@vant/weapp/lib')
  const destDir = resolve(cwd, 'src/wxcomponents/vant')

  if (!existsSync(srcDir))
    return console.log('@vant/weapp not found in node_modules')

  if (existsSync(destDir)) {
    const files = await readdir(destDir)

    if (files.length > 0)
      return console.log('@vant/weapp is ready to use')

    else
      await rm(destDir, { recursive: true })
  }

  await copy(srcDir, destDir)

  const files = await readdir(destDir)

  await createComponentsRecord(files, destDir)
}

copyVant().catch((e) => {
  console.log(e)
  process.exit(-1)
})
