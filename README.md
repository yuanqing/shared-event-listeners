# shared-event-listeners [![npm Version](http://img.shields.io/npm/v/shared-event-listeners.svg?style=flat)](https://www.npmjs.com/package/shared-event-listeners) [![Build Status](https://img.shields.io/travis/yuanqing/shared-event-listeners.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/shared-event-listeners)

> A utility for minimising the number of event listeners bound on a given DOM element.

## Example

```js
import sharedEventListeners from 'shared-event-listeners';

const button = document.querySelector('.button');
const eventListeners = sharedEventListeners(button);

function foo() {
  console.log('foo');
}
const removeFooListener = eventListeners.add('click', foo);

function bar() {
  console.log('bar');
}
const removeBarListener = eventListeners.add('click', bar);
```

Both the `foo` and `bar` listeners are called when we click on the `.button`. However, only **one** event listener is actually bound on the `.button`. (Internally, said event listener calls `foo` and `bar` in turn on the `click` event.)

Each call to `add` returns a function for removing the particular listener. In our example, the one event listener that was bound will be removed after we call **both** `removeFooListener` and `removeBarListener`.

```js
removeFooListener();
removeBarListener();
```

Run the [example](example/):

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

*Analogous to calling `addEventListener`.* Returns a function for removing the listener.

- `eventName` &mdash; A string.
- `listener` &mdash; A function that is called when an event of the specified `eventName` occurs.

### eventListeners.remove(eventName, listener)

*Analogous to calling `removeEventListener`.*

- `eventName` &mdash; A string.
- `listener` &mdash; The function to be removed.

## Installation

Install via [npm](https://npmjs.com):

```
$ npm i --save shared-event-listeners
```

## License

[MIT](LICENSE.md)
