# shared-event-listeners [![npm Version](http://img.shields.io/npm/v/shared-event-listeners.svg?style=flat)](https://www.npmjs.com/package/shared-event-listeners) [![Build Status](https://img.shields.io/travis/yuanqing/shared-event-listeners.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/shared-event-listeners)

> A utility for minimising the number of event listeners bound on a given DOM element.

## Usage

```js
import sharedEventListeners from 'shared-event-listeners';

const windowEventListeners = sharedEventListeners(window);

function foo() {
  console.log('foo');
}
const removeFooListener = windowEventListeners.add('scroll', foo);

function bar() {
  console.log('bar');
}
const removeBarListener = windowEventListeners.add('scroll', bar);
```

Both the `foo` and `bar` listeners are called on scroll. However, only **one** event listener is actually bound on the `window` element. (Internally, said event listener calls both `foo` and `bar` in turn on every `scroll` event.)

Each call to `add` returns a function for removing the particular listener. The one event listener that was bound on `window` will be removed after we call **both** `removeFooListener` and `removeBarListener`.

```js
removeFooListener();
removeBarListener();
```

## Example

```
$ git clone https://github.com/yuanqing/shared-event-listeners
$ npm install
$ npm install --global gulp
$ gulp example --open
```

## API

```js
import sharedEventListeners from 'shared-event-listeners';
```

### var eventListeners = sharedEventListeners([element])

- `element` &mdash; A DOM element. Defaults to `window`.

### eventListeners.add(eventName, listener)

Analogous to calling `addEventListener`. Returns a function for removing the listener.

- `eventName` &mdash; A string.
- `listener` &mdash; A function that is called when an event of the specified `eventName` occurs.

### eventListeners.remove(eventName, listener)

Analogous to calling `removeEventListener`.

- `eventName` &mdash; A string.
- `listener` &mdash; The function to be removed.

## Installation

Install via [npm](https://npmjs.com):

```
$ npm i --save shared-event-listeners
```

## License

[MIT](LICENSE.md)
