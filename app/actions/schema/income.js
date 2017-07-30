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
 * @param {Array} indices
 * @returns {{type: DELETE_CATEGORY, Array: *}}
 */
export const deleteCategory = indices => ({
    type: IncomeActionTypes.DELETE_CATEGORY,
    indices
});

/**
 * Update category with name in specific position
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: UPDATE_CATEGORY, index: *, name: *}}
 */
export const updateCategory = (name, indices) => ({
    type: IncomeActionTypes.UPDATE_CATEGORY,
    name,
    indices
});

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
export const fetchCategories = () => request.get(API.INCOME_GET, receiveCategories);