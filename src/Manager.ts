import {parse} from 'url';
import {IEntryManager, IStaticEntry} from './types';

export class Manager implements IEntryManager {
  constructor(private staticEntries: IStaticEntry[]) {
  }

  getEntryForPath(url: string): IStaticEntry | undefined {
    const parsed = parse(url)
    if (!parsed) {
      return
    }

    const { pathname } = parsed
    if (!pathname) {
      return
    }

    const path = pathname[0] === '/' ? pathname.slice(1) : pathname
    return this.staticEntries.find(entry => {
      return entry.path === path
    })
  }
}
