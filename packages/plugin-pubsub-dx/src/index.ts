import type { Instance, Plugin, Keyset, Job } from '@lightnub/core'
import { version } from '../package.json'

type PublishOptions = {
  keyset: Keyset
  channel: string
  message: any
}

type PublishResult = {}

export default class PubSubDxPlugin implements Plugin {
  readonly name = 'pubsub-dx'
  readonly version = version
  readonly priority = 'normal'

  constructor() {}
  onJobStarted(_job: Job<any, any>): void {}
  onJobFinished(_job: Job<any, any>): void {}

  initialize(instance: Instance) {
    instance.__decorate(
      'publish',
      function (
        { keyset, channel, message }: PublishOptions,
        callback: (error: Error | undefined, result: PublishResult) => void
      ) {
        return instance.__run({
          operation: 'publish',
          keyset: keyset,
          data: {
            channel: channel,
            message: message,
          },
          callback: callback,
        })
      }
    )
  }

  onJobCreated(job: Job) {
    if (job.operation === 'publish') {
      const { channel, message } = job.data
      const path = `/publish/${job.keyset.publishKey}/${job.keyset.subscribeKey}/0/${channel}/0/${encodeURIComponent(
        JSON.stringify(message)
      )}`

      job.data = {
        protocol: 'http:',
        host: 'ps.pndsn.com',
        path: path,
        method: 'GET',
      }
    }
  }
}
