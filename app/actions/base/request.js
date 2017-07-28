'use strict';

/*
 *
 * Async request to get actions
 *
 */

import fetch from 'isomorphic-fetch';

function tpl(dispatch, callback, url, method, body) {
    return fetch(url, {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(json => dispatch(callback(json)))
        .catch(err => {
            console.log('ERROR: ' + err);
            dispatch(callback([]));
        });
}

/**
 * GET request with url and callback
 * @param {String} url
 * @param {Function} callback
 * @returns {Function}
 */
const get = (url, callback) => {
    return dispatch => tpl(dispatch, callback, url, 'GET');
};

/**
 * POST request with url and callback
 * @param {String} url
 * @param {String} body: request body
 * @param {Function} callback
 * @returns {Function}
 */
const post = (url, body, callback) => {
    return dispatch => tpl(dispatch, callback, url, 'POST', body);
};

/**
 * DELETE request with url and callback
 * @param {String} url
 * @param {Function} callback
 * @returns {Function}
 */
const del = (url, callback) => {
    return dispatch => tpl(dispatch, callback, url, 'DELETE');
};

/**
 * DELETE request with url and callback
 * @param {String} url
 * @param {String} body: request body
 * @param {Function} callback
 * @returns {Function}
 */
const update = (url, body, callback) => {
    return dispatch => tpl(dispatch, callback, url, 'PUT', body);
};

const request = {
    get,
    post,
    del,
    update
};

export default request;