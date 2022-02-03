# LightNub

This is a Proof-of-Concept library that provides PubNub-compatible JavaScript SDK
for IoT and embedded devices capable of running JavaScript.

Minimal required ECMAScript version supported is ES5, but the code emitted should
work on older implementations with correct polyfills.

## Usage

This library is highly modularized, so you need to import multiple packages to get
it working.

Start by importing the `core` module, which provides the necessary structure
for other modules to work.

```js
const LightNub = require('@lightnub/core')
```

You need to provide additional modules to include specific features.
Some modules are tagged as `networking` or `codec`, you need at least one of each
for the SDK to work correctly.

To instantiate the SDK with modules, you need to pass them as arguments to the `LightNub` function
that you imported from `@lightnub/core`.

```js
const LightNub = require('@lighnub/core')
const Module1 = require('@lightnub/module-1')
const Module2 = require('@lightnub/module-2')

const pubnub = LightNub(
    Module1,
    Module2,
)

// Now you can use pubnub
pubnub.module1Function()
pubnub.module2Function()
```

## Modules
### `module-default-codecs` <small>tags: codec</small>
This module provides basic `json` and `url` codecs for JavaScript environments
that have `JSON.parse`, `JSON.stringify`, `decodeURIComponent` and `encodeURIComponent`
available as globals.

```js
const LightNub = require('@lightnub/core')
const DefaultCodecs = require('@lightnub/module-default-codecs') 

const pubnub = LightNub(
    DefaultCodecs
)
```

### `module-espruino-networking` <small>tags: networking</small>
This module provides networking for IoT boards that run Espruino.
You need to pass the `HttpModule` into the module function.

```js
const http = require('http')
const LightNub = require('@lightnub/core')
const EspruinoNetworking = require('@lightnub/module-espruino-networking')

const pubnub = LightNub(
    EspruinoNetworking(http)
)
```

### `module-publish` <small>requires: networking, codec</small>
This module provides the basic publish functionality.

```js
const LightNub = require('@lightnub/core')
const Networking = require('@lightnub/default-networking')
const Codecs = require('@lightnub/-efault-codecs')

const pubnub = LightNub(
    Networking,
    Promises,
    Codecs
)

const keyset = {
    subscribeKey: 'demo',
    publishKey: 'demo',
    uuid: 'myUuid',
}

pubnub.publish({ message: { content: 'My message' }, channel: 'test', keyset: myKeyset }).then((response) => {
    console.log(response)
})
```