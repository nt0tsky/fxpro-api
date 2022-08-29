import { promises, constants } from 'fs'
import { join } from 'path'

const directoryIsExists = async (dir: string) => {
  try {
    await promises.access(dir, constants.F_OK)

    return true
  } catch (err) {
    return false
  }
}

const main = async () => {
  const buildDir = join(__dirname, '..', 'build')

  if (await directoryIsExists(buildDir)) {
    await promises.rm(buildDir, { recursive: true, force: true })
  }
}

main()
