import { Plugin, Instance, Job } from '@lightnub/plugin'

import { version } from '../package.json'

export default class LightNub implements Instance {
  [key: string]: any

  static __version: string = version

  private readonly __plugins: Plugin[]

  private __jobCreatedHook(job: Job) {
    for (const plugin of this.__plugins) {
      plugin.onJobCreated(job)
    }
  }

  private __jobStartedHook(job: Job) {
    for (const plugin of this.__plugins) {
      plugin.onJobStarted(job)
    }
  }

  private __jobFinishedHook(job: Job) {
    for (const plugin of this.__plugins) {
      plugin.onJobFinished(job)
    }
  }

  constructor(plugins: Plugin[]) {
    this.__plugins = plugins

    for (const plugin of this.__plugins) {
      plugin.initialize(this)
    }
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

    this.__jobCreatedHook(job)
    this.__jobStartedHook(job)
    this.__jobFinishedHook(job)
  }
}
