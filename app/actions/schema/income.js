'use strict';

/*
 *
 * Actions for categories of Income
 *
 */

import * as API from '../../constants/API';
import * as IncomeActionTypes from '../../actiontypes/schema/income';
import request from './../base/request.js';

/**
 * Add category with name
 * @param {String} name
 * @param {String} catId
 * @returns {{type: ADD_CATEGORY, cat: Object}}
 */
export const addCategory = (name, catId) => {
    const url = catId ? API.INCOME_CREATE_SUBCATEGORY({ catId }) : API.INCOME_CREATE_CATEGORY;

    return request.post(url, { catId, name }, cat => ({
        type: IncomeActionTypes.ADD_CATEGORY,
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
    const url = itemId ? API.INCOME_DELETE_SUBCATEGORY({ itemId, catId }) : API.INCOME_DELETE_CATEGORY({ catId });

    return request.del(url, cat => ({
        type: IncomeActionTypes.DELETE_CATEGORY,
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
    const url = itemId ? API.INCOME_UPDATE_SUBCATEGORY({ itemId, catId }) : API.INCOME_UPDATE_CATEGORY({ catId });

    return request.update(url, { name }, cat => ({
        type: IncomeActionTypes.UPDATE_CATEGORY,
        cat
    }));
};

/**
 * Receive categories
 * @param json
 * @returns {{type: RECEIVE_CATEGORIES, data: *}}
 */
function receiveCategories(json) {
    return {
        type: IncomeActionTypes.RECEIVE_CATEGORIES,
        data: json
    };
}

/**
 * Fetch categories from server
 * @returns {Function}
 */
export const fetchCategories = dispatch => dispatch(request.get(API.INCOME_GET, receiveCategories));