export interface IStaticEntry {
  path: string
  mimeType: string
  body: string
}

export interface IEntryManager {
  getEntryForPath(path: string): IStaticEntry
}
