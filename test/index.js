import test from 'tape';
import sharedEventListeners from '../src';

function createNode() {
  const node = document.createElement('div');
  document.body.appendChild(node);
  return node;
}

function removeNode(node) {
  node.parentNode.removeChild(node);
}

function clickNode(node) {
  node.dispatchEvent(new MouseEvent('click'));
};

test('is a function', (t) => {
  t.plan(1);

  t.true(typeof sharedEventListeners === 'function');
});

test('adds and removes multiple listeners on `window`', (t) => {
  t.plan(3);

  // Set up.
  const eventListeners = sharedEventListeners();
  let array;

  // Add listeners.
  const removeFirstEventListener = eventListeners.add('click', () => {
    array.push('foo');
  });
  const removeSecondEventListener = eventListeners.add('click', () => {
    array.push('bar');
  });
  array = [];
  clickNode(window);
  t.looseEqual(array, ['foo', 'bar']);

  // Remove first listener.
  removeFirstEventListener();
  array = [];
  clickNode(window);
  t.looseEqual(array, ['bar']);

  // Remove second listener.
  removeSecondEventListener();
  array = [];
  clickNode(window);
  t.looseEqual(array, []);
});

test('adds and removes multiple listeners on the specified `node`', (t) => {
  t.plan(3);

  // Set up.
  const node = createNode();
  const eventListeners = sharedEventListeners(node);
  let array;

  // Add listeners.
  const removeFirstEventListener = eventListeners.add('click', () => {
    array.push('foo');
  });
  const removeSecondEventListener = eventListeners.add('click', () => {
    array.push('bar');
  });
  array = [];
  clickNode(node);
  t.looseEqual(array, ['foo', 'bar']);

  // Remove first listener.
  removeFirstEventListener();
  array = [];
  clickNode(node);
  t.looseEqual(array, ['bar']);

  // Remove second listener.
  removeSecondEventListener();
  array = [];
  clickNode(node);
  t.looseEqual(array, []);

  // Tear down.
  removeNode(node);
});

test('throws if a listener to be removed does not exist', (t) => {
  t.plan(1);

  // Set up.
  const node = createNode();
  const eventListeners = sharedEventListeners(node);

  // Remove listener.
  t.throws(() => {
    eventListeners.remove('click', () => {});
  })

  // Tear down.
  removeNode(node);
});
