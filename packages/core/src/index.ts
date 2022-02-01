import { version } from '../package.json'

export type PluginPriority = 'lowest' | 'low' | 'normal' | 'high' | 'highest'

export interface Keyset {
  subscribeKey: string
  uuid: string

  publishKey?: string
}

export interface Job<I = any, O = any> {
  id: number
  operation: string
  keyset: Keyset
  data: I
  isDone: boolean
  callback: (error: Error | undefined, result: O) => void
}

export interface Instance {
  [key: string]: any

  __decorate(name: string, fn: Function): void
  __run(job: Partial<Job>): void
}

export interface Plugin {
  name: string
  version: string
  priority: PluginPriority

  initialize(_instance: Instance): void

  onJobCreated(_job: Job): void
  onJobStarted(_job: Job): void
  onJobFinished(_job: Job): void
}

export default class LightNub implements Instance {
  [key: string]: any

  static __version: string = version

  private readonly __plugins: any[]

  private __hook(name: string, arg: any) {
    for (const plugin of this.__plugins) {
      plugin[name](arg)
    }
  }

  constructor(plugins: Plugin[]) {
    this.__plugins = plugins

    this.__hook('initialize', this)
  }

  __decorate(name: string, fn: Function) {
    this[name] = fn.bind(this)
  }

  private __jobCounter = 0
  __run({ data, callback, keyset, operation }: Omit<Job, 'id' | 'isDone'>) {
    const job: Job = {
      id: this.__jobCounter++,
      data,
      callback,
      keyset,
      operation,
      isDone: false,
    }

    this.__hook('onJobCreated', job)
    this.__hook('onJobStarted', job)
    this.__hook('onJobFinished', job)
  }
}
