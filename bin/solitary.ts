import {generateEntries} from '../src/walker'
import {mkdirSync, readFileSync, writeFileSync} from 'fs';
import {join, resolve} from 'path';
import {tmpdir} from 'os';
import {copySync} from 'fs-extra';
import * as Bundler from 'parcel-bundler';

const directory = process.argv[2]
const target = process.argv[3]
const port = Number(process.argv[4])

const entries = generateEntries(directory)

const tmpPath = join(tmpdir(), 'solitary-npm-' + (Math.random() * 10000 | 0))
mkdirSync(tmpPath)
copySync(join(__dirname, '..', 'src'), tmpPath)
copySync(join(__dirname, '..', 'package.json'), join(tmpPath, 'package.json'))

let template = readFileSync(join(tmpPath, 'template.ts'), 'utf8')
template = template.replace('PORT', String(port))
template = template.replace('ENTRIES', JSON.stringify(entries))
writeFileSync(join(tmpPath, 'template.ts'), template)

const options = {
  outDir: tmpPath,
  cache: false,
  cacheDir: '.cache',
  contentHash: false,
  minify: true,
  target: 'node',
  bundleNodeModules: true,
  autoInstall: false,
  sourceMaps: false
};


async function run() {
  const bundler = new Bundler(join(tmpPath, 'template.ts'), options as any);
  await bundler.bundle()
  copySync(join(tmpPath, 'template.js'), resolve(process.cwd(), target))
  process.exit(0)
}

run()
