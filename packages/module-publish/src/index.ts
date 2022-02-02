import type { CoreType, Keyset, Module } from '@lightnub/core'
import { version } from '../package.json'

class PublishModule implements Module<'dx'> {
  version = version
  name = 'publish-dx'
  type = 'dx' as const

  get() {}
}

type PublishParams = {
  channel: string
  message: any
  keyset: Keyset
}

export default function WithPublish<T extends CoreType>(klazz: T) {
  return class WithPublish extends klazz {
    constructor(...args: any[]) {
      super(...args)

      this.registerModule(new PublishModule())
    }

    publish({ channel, message, keyset }: PublishParams) {
      const networking = this.get('networking')
      const jsonCodec = this.get('codec', { format: 'json' })
      const urlCodec = this.get('codec', { format: 'url' })

      const encodedMessage = urlCodec.encode(jsonCodec.encode(message))
      const encodedChannel = urlCodec.encode(channel)

      networking.request({
        method: 'get',
        path: `/publish/${keyset.publishKey}/${keyset.subscribeKey}/0/${encodedChannel}/0/${encodedMessage}`,
      })
    }
  }
}

//   initialize(instance: Instance) {
//     instance.__decorate(
//       'publish',
//       function (
//         { keyset, channel, message }: PublishOptions,
//         callback: (error: Error | undefined, result: PublishResult) => void
//       ) {
//         return instance.__run({
//           operation: 'publish',
//           keyset: keyset,
//           data: {
//             channel: channel,
//             message: message,
//           },
//           callback: callback,
//         })
//       }
//     )
//   }

//   onJobCreated(job: Job) {
//     if (job.operation === 'publish') {
//       const { channel, message } = job.data
//       const path = `/publish/${job.keyset.publishKey}/${job.keyset.subscribeKey}/0/${channel}/0/${encodeURIComponent(
//         JSON.stringify(message)
//       )}`

//       job.data = {
//         protocol: 'http:',
//         host: 'ps.pndsn.com',
//         path: path,
//         method: 'GET',
//       }
//     }
//   }
// }
