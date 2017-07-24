'use strict';

/*
 *
 * Actions for categories of Account
 *
 */

import * as API from '../../constants/API';
import * as AccountActionTypes from '../../actiontypes/schema/account';
import request from './../base/request.js';

/**
 * Add category with name
 * @param {String} name
 * @param {String} catId
 * @returns {{type: ADD_CATEGORY, cat: Object}}
 */
export const addCategory = (name, catId) => {
    const url = catId ? API.ACCOUNT_CREATE_SUBCATEGORY({ catId }) : API.ACCOUNT_CREATE_CATEGORY;

    return request.post(url, { catId, name }, cat => {
        return {
            type: AccountActionTypes.ADD_CATEGORY,
            cat
        }
    });
};

/**
 * Delete category in specific position
 * @param {Array} indices
 * @returns {{type: DELETE_CATEGORY, Array: *}}
 */
export const deleteCategory = indices => {
    return {
        type: AccountActionTypes.DELETE_CATEGORY,
        indices
    };
};

/**
 * Update category with name in specific position
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: UPDATE_CATEGORY, index: *, name: *}}
 */
export const updateCategory = (name, indices) => {
    return {
        type: AccountActionTypes.UPDATE_CATEGORY,
        name,
        indices
    };
};

/**
 * Fetch categories from server
 * @returns {Function}
 */
export const fetchCategories = () => request.get(API.ACCOUNT_GET, data => {
    return {  // generate action with response data
        type: AccountActionTypes.RECEIVE_CATEGORIES,
        data
    };
});