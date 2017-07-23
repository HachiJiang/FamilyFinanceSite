/**
 * Async request to get actions
 */

import fetch from 'isomorphic-fetch';

// @TODO: use get/post/put?...

/**
 * Request url and execute callback
 * @param {String} url
 * @param {Function} callback
 * @returns {Function}
 */
const request = (url, callback) => {
    return dispatch => {
        return fetch(url)
            .then(res => res.json())
            .then(json => dispatch(callback(json)));
    }
};

export default request