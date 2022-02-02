import type { CoreType, Module, Request, Response } from '@lightnub/core'
import { version } from '../package.json'

class JsonCodec implements Module<'codec'> {
  version = version
  name = 'default-codec-json'
  type = 'codec' as const

  filter = { format: 'json' }

  get() {
    return this
  }

  encode(input: any): string {
    return JSON.stringify(input)
  }

  decode(input: string): any {
    return JSON.parse(input)
  }
}

class UrlCodec implements Module<'codec'> {
  version = version
  name = 'default-codec-url'
  type = 'codec' as const

  filter = { format: 'url' }

  get() {
    return this
  }

  encode(input: any): string {
    return encodeURIComponent(input)
  }

  decode(input: string): any {
    return decodeURIComponent(input)
  }
}

export default function WithDefaultCodec<T extends CoreType>(klazz: T) {
  return class WithEspruinoNetworking extends klazz {
    constructor(...args: any[]) {
      super(...args)

      this.registerModule(new JsonCodec())
      this.registerModule(new UrlCodec())
    }
  }
}
