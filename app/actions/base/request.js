'use strict';

/*
 *
 * Async request to get actions
 *
 */
import fetch from 'isomorphic-fetch';
import * as messageUtils from '../../utils/messageUtils';

const onFail = err => {
    if (err) {
        console.log(`ERROR: ${err.message}`);
        console.log(`ERROR: ${err.stack}`);
    }
    messageUtils.fail();
};

const tpl = (dispatch, callback, url, method, body) => fetch(url, {
    method: method,
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(body)
})
    .then(res => res.json())
    .then(json => {
        const { error } = json;
        if (error) {
            onFail(error);
        } else {
            if (method !== 'GET') {
                messageUtils.success();
            }
            dispatch(callback(json));
        }
    })
    .catch(onFail);

/**
 * GET request with url and callback
 * @param {String} url
 * @param {Function} callback
 * @returns {Function}
 */
const get = (url, callback) => dispatch => tpl(dispatch, callback, url, 'GET');

/**
 * POST request with url and callback
 * @param {String} url
 * @param {String} body: request body
 * @param {Function} callback
 * @returns {Function}
 */
const post = (url, body, callback) => dispatch => tpl(dispatch, callback, url, 'POST', body);

/**
 * DELETE request with url and callback
 * @param {String} url
 * @param {Function} callback
 * @returns {Function}
 */
const del = (url, callback) => dispatch => tpl(dispatch, callback, url, 'DELETE');

/**
 * DELETE request with url and callback
 * @param {String} url
 * @param {String} body: request body
 * @param {Function} callback
 * @returns {Function}
 */
const update = (url, body, callback) => dispatch => tpl(dispatch, callback, url, 'PUT', body);

const request = {
    get,
    post,
    del,
    update
};

export default request;