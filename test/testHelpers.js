/**
 * Triggers event for element
 *
 * @param {DOMElement} el Element
 * @param {string} eventName Event name
 */
const triggerEvent = (el, eventName) => {
  const event = document.createEvent('Event');
  event.initEvent(eventName, true, true);
  el.dispatchEvent(event);
};

export default triggerEvent;
