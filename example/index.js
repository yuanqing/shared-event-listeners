import sharedEventListeners from '../';

var eventListeners = sharedEventListeners(document.querySelector('.trigger'));
var removeFirstListener = eventListeners.add('click', function() {
  console.log('first');
});
var removeSecondListener = eventListeners.add('click', function() {
  console.log('second');
});
document.querySelector('.remove-first-listener').addEventListener('click', removeFirstListener);
document.querySelector('.remove-second-listener').addEventListener('click', removeSecondListener);
