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

    return request.post(url, { name }, cat => ({
        type: AccountActionTypes.ADD_CATEGORY,
        cat
    }));
};

/**
 * Delete category in specific position
 * @param {String} catId
 * @param {String} itemId
 * @returns {{type: DELETE_CATEGORY, cat: {}, itemId: String}}
 */
export const deleteCategory = (catId, itemId) => {
    const url = itemId ? API.ACCOUNT_DELETE_SUBCATEGORY({ itemId, catId }) : API.ACCOUNT_DELETE_CATEGORY({ catId });

    return request.del(url, cat => ({
        type: AccountActionTypes.DELETE_CATEGORY,
        cat,
        itemId
    }));
};

/**
 * Update category with name in specific position
 * @param {String} name
 * @param {String} catId
 * @param {String} itemId
 * @returns {{type: UPDATE_CATEGORY, cat: {}}}
 */
export const updateCategory = (name, catId, itemId) => {
    const url = itemId ? API.ACCOUNT_UPDATE_SUBCATEGORY({ itemId, catId }) : API.ACCOUNT_UPDATE_CATEGORY({ catId });

    return request.update(url, { name }, cat => ({
        type: AccountActionTypes.UPDATE_CATEGORY,
        cat
    }));
};

/**
 * Fetch categories from server
 * @returns {Function}
 */
export const fetchCategories = dispatch => dispatch(request.get(API.ACCOUNT_GET, data => ({  // generate action with response data
    type: AccountActionTypes.RECEIVE_CATEGORIES,
    data
})));