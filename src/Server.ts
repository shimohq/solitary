import {IEntryManager} from './types'
import {createServer, Server, IncomingMessage, ServerResponse} from 'http'

export class StaticServer {
  private server: Server
  constructor(private manager: IEntryManager) {
    this.server = createServer((req, res) => {
      this.serve(req, res)
    })
  }

  listen(port: number) {
    this.server.listen(port)
  }

  serve(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // method not allowed
      res.statusCode = 405
      res.setHeader('Allow', 'GET, HEAD')
      res.setHeader('Content-Length', '0')
      res.end()
      return
    }

    const entry = this.manager.getEntryForPath(req.url)
    if (!entry) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')
      const body = JSON.stringify({error: 'Not Found'})
      res.setHeader('Content-Length', body.length)
      res.end(body)
      return
    }
    res.statusCode = 200
    res.setHeader('Content-Type', entry.mimeType)
    res.setHeader('Content-Length', entry.body.length)
    res.end(entry.body)
  }

}
