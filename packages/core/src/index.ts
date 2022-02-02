import shallowequal from 'shallowequal'

import type { Module, ModuleInterfaceType, KnownModuleInterfaces } from './Module'

import { version } from '../package.json'

export * from './Module'
export interface Keyset {
  subscribeKey: string
  uuid: string

  publishKey?: string
}

export type CoreType = { new (...args: any[]): Core }
class Core {
  static version = version

  private modules: Module<ModuleInterfaceType>[] = []

  protected registerModule(module: Module<ModuleInterfaceType>) {
    this.modules.push(module)

    module.initialize?.(this)
  }

  protected get<I, T extends ModuleInterfaceType>(type: T, filter?: Record<string, any>): KnownModuleInterfaces[T] {
    const module = this.modules.find(
      (module) =>
        module.type === type &&
        (module.filter === undefined || filter === undefined || shallowequal(module.filter, filter))
    ) as Module<T>

    if (!module) {
      throw new Error(
        `A ${type} module is missing that can fulfill following requirements: ${JSON.stringify(
          filter
        )}. Make sure to include this module during instantiation.`
      )
    }

    return module.get()
  }
}

export type { Core }

// @ts-ignore
export default function LightNub(...decorators) {
  // @ts-ignore
  return new (decorators.reduceRight((klass, decorator) => decorator(klass), Core))()
}

LightNub.Core = Core
