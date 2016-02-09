import sharedEventListeners from '../';

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

document.querySelector('.remove-foo-listener').addEventListener('click', removeFooListener);
document.querySelector('.remove-bar-listener').addEventListener('click', removeBarListener);
