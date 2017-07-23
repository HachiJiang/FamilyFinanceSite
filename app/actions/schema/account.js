'use strict';

/*
 *
 * Actions for categories of Account
 *
 */

import * as AccountActionTypes from '../../actiontypes/schema/account';
import request from './../base/request.js';
import { ACCOUNT_GET } from '../../constants/API';

/**
 * Add category with name
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: ADD_CATEGORY, name: *, indices: *}}
 */
export const addCategory = (name, indices) => {
    return {
        type: AccountActionTypes.ADD_CATEGORY,
        name,
        indices
    };
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
 * Receive categories
 * @param json
 * @returns {{type: RECEIVE_CATEGORIES, data: *}}
 */
function receiveCategories(json) {
    return {
        type: AccountActionTypes.RECEIVE_CATEGORIES,
        data: json
    };
}

/**
 * Fetch categories from server
 * @returns {Function}
 */
export const fetchCategories = () => {
    return request(ACCOUNT_GET, receiveCategories);
};