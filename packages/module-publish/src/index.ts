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

      return networking
        .request({
          method: 'get',
          path: `/publish/${keyset.publishKey}/${keyset.subscribeKey}/0/${encodedChannel}/0/${encodedMessage}`,
        })
        .then((response) => {
          return jsonCodec.decode(response.body)
        })
    }
  }
}
