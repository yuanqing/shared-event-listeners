const mapWindowEventNameToListeners = {};
const mapWindowEventNameToSharedListener = {};

export default (element = window) => {

  // If the `element` is `window`, persist `mapEventNameToListeners` and
  // `mapEventNameToSharedListener` across different calls
  // to `sharedEventListeners`.
  const isWindow = element === window;

  // Maps `eventName` to the list of listeners associated with each
  // respective `eventName`.
  const mapEventNameToListeners = isWindow ? mapWindowEventNameToListeners : {};

  // Maps `eventName` to the shared listener bound to `element`.
  const mapEventNameToSharedListener = isWindow ? mapWindowEventNameToSharedListener : {};

  // Remove the `listener` from the list of listeners associated with
  // the `eventName`.
  function remove(eventName, listener) {
    const listeners = mapEventNameToListeners[eventName];
    const listenerIndex = listeners ? listeners.indexOf(listener) : -1;
    if (listenerIndex === -1) {
      throw new Error('The listener to be removed does not exist');
    }
    listeners.splice(listenerIndex, 1);
    if (listeners.length === 0) {
      element.removeEventListener(eventName, mapEventNameToSharedListener[eventName]);
      delete mapEventNameToListeners[eventName];
      delete mapEventNameToSharedListener[eventName];
    }
  }

  // Add the `listener` to the list of listeners associated with
  // the `eventName`.
  function add(eventName, listener) {
    let listeners = mapEventNameToListeners[eventName];
    if (!listeners) {
      listeners = [listener];
      mapEventNameToListeners[eventName] = listeners;
      function sharedListener() {
        listeners.forEach(listener => {
          listener();
        });
      }
      mapEventNameToSharedListener[eventName] = sharedListener;
      element.addEventListener(eventName, sharedListener);
    } else {
      mapEventNameToListeners[eventName].push(listener);
    }
    return remove.bind(null, eventName, listener);
  }

  // Expose public API.
  return {
    add,
    remove
  };

};
