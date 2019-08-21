import {Manager} from './Manager';
import {StaticServer} from './Server';

// @ts-ignore
export const manager = new Manager(ENTRIES)

// @ts-ignore
const port = PORT
if (port) {
  const server = new StaticServer(manager)
  server.listen(port)
} else {
}
