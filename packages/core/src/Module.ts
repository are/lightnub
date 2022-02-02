import type { Core } from '.'

export type ModuleInterfaceType = 'codec' | 'networking' | 'dx'

type CodecModuleInterface = {
  encode<T>(input: T): string
  decode<T>(input: string): T
}

export type Request = {
  path: string
  method: string
  headers?: Record<string, string>
  body?: string
}

export type Response = {
  status: number
  body: string
  headers: Record<string, string>
}

type NetworkingModuleInterface = {
  request(request: Request): Promise<Response>
}

type EmptyModuleInterface = void

export type KnownModuleInterfaces = {
  codec: CodecModuleInterface
  networking: NetworkingModuleInterface
  dx: EmptyModuleInterface
}

export interface Module<T extends ModuleInterfaceType> {
  name: string
  version: string
  type: T

  filter?: Record<string, any>

  initialize?(core: Core): void

  get(): KnownModuleInterfaces[T]
}
