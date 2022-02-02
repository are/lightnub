import type { Instance, Job, Plugin } from '@lightnub/core'
import { version } from '../package.json'

type HttpRequest = {
  on: (eventName: 'error', callback: (error?: Error) => void) => void
  end: (body: string) => void
}

type HttpResponse = {
  on: (eventName: 'data' | 'close', callback: (data?: string) => void) => void
}

type HttpRequestOptions = {
  host: string
  path: string
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
  port?: number
  protocol?: 'http:' | 'https:'
  headers?: { [key: string]: string }
}

type HttpModule = {
  request(options: HttpRequestOptions, callback: (response: HttpResponse) => void): HttpRequest
}

export default class EspruinoNetworkingPlugin implements Plugin {
  readonly name = 'espruino-networking'
  readonly version = version
  readonly priority = 'normal'

  _httpClient: HttpModule

  constructor(httpModule: HttpModule) {
    this._httpClient = httpModule
  }

  initialize(_instance: Instance): void {}
  onJobCreated(_job: Job<any, any>): void {}
  onJobFinished(_job: Job<any, any>): void {}

  onJobStarted(job: Job): void {
    const req = this._httpClient.request(job.data, (res) => {
      let result = ''

      res.on('data', (data) => {
        result += data
      })

      res.on('close', () => {
        job.isDone = true
        job.callback(undefined, JSON.parse(result))
      })
    })

    req.on('error', (error) => {
      job.isDone = true
      job.callback(error, undefined)
    })

    req.end(job.data.body ? job.data.body : undefined)
  }
}
