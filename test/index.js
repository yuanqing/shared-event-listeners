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

test('binds and removes a single listener on `window`', (t) => {
  t.plan(2);
  const node = createNode();
  const eventListeners = sharedEventListeners();
  let array;
  let i;

  const removeEventListener = eventListeners.add('click', () => {
    array.push(i);
  });
  array = [];
  i = 1;
  clickNode(window);
  t.looseEqual(array, [1]);

  removeEventListener();
  array = [];
  i = 2;
  clickNode(window);
  t.looseEqual(array, []);
});

test('binds and removes a single listener on the specified `node`', (t) => {
  t.plan(2);
  const node = createNode();
  const eventListeners = sharedEventListeners(node);
  let array;
  let i;

  const removeEventListener = eventListeners.add('click', () => {
    array.push(i);
  });
  array = [];
  i = 1;
  clickNode(node);
  t.looseEqual(array, [1]);

  removeEventListener();
  array = [];
  i = 2;
  clickNode(node);
  t.looseEqual(array, []);

  removeNode(node);
});

test('binds and removes multiple listeners on the specified `node`', (t) => {
  t.plan(3);
  const node = createNode();
  const eventListeners = sharedEventListeners(node);
  let array;
  let i;
  let j;

  const removeFirstEventListener = eventListeners.add('click', () => {
    array.push(i);
  });
  const removeSecondEventListener = eventListeners.add('click', () => {
    array.push(j);
  });
  array = [];
  i = 1;
  j = 'a';
  clickNode(node);
  t.looseEqual(array, [1, 'a']);

  removeFirstEventListener();
  array = [];
  i = 2;
  j = 'b';
  clickNode(node);
  t.looseEqual(array, ['b']);

  removeSecondEventListener();
  array = [];
  i = 3;
  j = 'c';
  clickNode(node);
  t.looseEqual(array, []);

  removeNode(node);
});

test('throws if a listener to be removed does not exist', (t) => {
  t.plan(1);
  const node = createNode();
  const eventListeners = sharedEventListeners(node);

  t.throws(() => {
    eventListeners.remove('click', () => {});
  })

  removeNode(node);
});
