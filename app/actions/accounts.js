/*
 *
 * Actions for categories of Account
 *
 */

import * as CategoryActionTypes from '../actiontypes/category';
import * as API from '../constants/API';

/**
 * Add category with name
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: ADD_CATEGORY_ACCOUNT, name: *, indices: *}}
 */
export const addCategory = (name, indices) => {
    return {
        type: CategoryActionTypes.ADD_CATEGORY_ACCOUNT,
        name,
        indices
    };
};

/**
 * Delete category in specific position
 * @param {Array} indices
 * @returns {{type: DELETE_CATEGORY_ACCOUNT, Array: *}}
 */
export const deleteCategory = indices => {
    return {
        type: CategoryActionTypes.DELETE_CATEGORY_ACCOUNT,
        indices
    };
};

/**
 * Update category with name in specific position
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: UPDATE_CATEGORY_ACCOUNT, index: *, name: *}}
 */
export const updateCategory = (name, indices) => {
    return {
        type: CategoryActionTypes.UPDATE_CATEGORY_ACCOUNT,
        name,
        indices
    };
};

/**
 * Receive account categories
 * @param json
 * @returns {{type: ACCOUNTS_RECEIVE_CATEGORIES, accounts: *}}
 */
function receiveCategories(json) {
    return {
        type: CategoryActionTypes.ACCOUNTS_RECEIVE_CATEGORIES,
        cats: json
    };
}

/**
 * Fetch accounts from server
 * @returns {Function}
 */
export const fetchCategories = () => {
    return dispatch => {
        return fetch(API.ACCOUNT_GET)
            .then(res => res.json())
            .then(json => dispatch(receiveCategories(json)));
    };
};