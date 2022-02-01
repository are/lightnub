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
