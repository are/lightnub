import type { Instance, Job, Plugin } from '@lightnub/plugin'
import { version } from '../package.json'

type HttpModule = {}

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
    job.isDone = true
    job.callback(undefined, true)
  }
}
