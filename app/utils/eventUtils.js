'use strict';

/*
 *
 * Utils for events
 *
 */

/**
 * Add event to dom node
 * @param {Element} el
 * @param {String} type
 * @param {Function} handler
 */
const addEvent = (el, type, handler) => {
    if (el.addEventListener) {
        el.addEventListener(type, handler, false); // 冒泡, dom 2级
    } else if (el.attachEvent) {
        el.attachEvent(`on${type}`, handler);      // IE
    } else {
        el[`on${type}`] = handler;
    }
};

/**
 * Remove event to dom node
 * @param {Element} el
 * @param {String} type
 * @param {Function} handler
 */
const removeEvent = (el, type, handler) => {
    if (el.removeEventListener) {
        el.removeEventListener(type, handler, false); // 冒泡
    } else if (el.detachEvent) {
        el.detachEvent(`on${type}`, handler);
    } else {
        el[`on${type}`] = null;
    }
};

export {
    addEvent,
    removeEvent
}