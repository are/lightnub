import type { CoreType, Module, Request, Response } from '@lightnub/core'
import { version } from '../package.json'

type HttpRequest = {
  on: (eventName: 'error', callback: (error?: Error) => void) => void
  end: (body?: string) => void
}

type HttpResponse = {
  on: (eventName: 'data' | 'close', callback: (data?: string) => void) => void
  statusCode: number
  headers: { [key: string]: string }
}

type HttpRequestOptions = {
  host: string
  path: string
  method: string
  port?: number
  protocol?: 'http:' | 'https:'
  headers?: { [key: string]: string }
}

type HttpModule = {
  request(options: HttpRequestOptions, callback: (response: HttpResponse) => void): HttpRequest
}

class EspruinoNetworking implements Module<'networking'> {
  version = version
  name = 'espruino-networking'
  type = 'networking' as const

  httpModule: HttpModule

  constructor(httpModule: HttpModule) {
    this.httpModule = httpModule
  }

  get() {
    return this
  }

  request(request: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      const req = this.httpModule.request(
        {
          host: 'ps.pndsn.com',
          method: request.method.toUpperCase(),
          path: request.path,
          headers: request.headers,
        },
        (res) => {
          let result = ''

          res.on('data', (data) => {
            result += data
          })

          res.on('close', () => {
            resolve({ status: res.statusCode, body: result, headers: res.headers })
          })
        }
      )

      req.on('error', (error) => {
        reject(error)
      })

      if (request.body) {
        req.end(request.body)
      } else {
        req.end()
      }
    })
  }
}

export default (httpModule: HttpModule) =>
  function WithEspruinoNetworking<T extends CoreType>(klazz: T) {
    return class WithEspruinoNetworking extends klazz {
      constructor(...args: any[]) {
        super(...args)

        this.registerModule(new EspruinoNetworking(httpModule))
      }
    }
  }
