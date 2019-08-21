import * as walk from 'walk-sync'
import {lookup} from 'mime-types'
import {IStaticEntry} from './types';
import {readFileSync} from 'fs';
import {join} from 'path';

export function generateEntries(staticPath: string): IStaticEntry[] {
  const entries = walk(staticPath, {
    directories: false,
    ignore: ['.*']
  })

  return entries.map(entry => {
    return {
      path: entry,
      mimeType: lookup(entry) || 'text/plain',
      body: readFileSync(join(staticPath, entry), 'utf8')
    }
  })
}
