export default (element = window) => {

  // Maps `eventName` to the list of listeners associated with each
  // respective `eventName`.
  const mapEventNameToListeners = {};

  // Maps `eventName` to the shared listener bound to `element`.
  const mapEventNameToSharedListener = {};

  // Remove the `listener` from the list of listeners associated with
  // the `eventName`.
  function remove(eventName, listener) {
    const listeners = mapEventNameToListeners[eventName];
    const index = listeners ? listeners.indexOf(listener) : -1;
    if (index === -1) {
      throw new Error('The listener to be removed does not exist');
    }
    listeners.splice(index, 1);
    if (listeners.length === 0) {
      delete mapEventNameToSharedListener[eventName];
      element.removeEventListener(eventName, mapEventNameToSharedListener[eventName]);
    }
  }

  // Add the `listener` to the list of listeners associated with
  // the `eventName`.
  function add(eventName, listener) {
    let listeners = mapEventNameToListeners[eventName];
    if (!listeners || listeners.length === 0) {
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
