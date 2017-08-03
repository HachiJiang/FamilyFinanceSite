'use strict';

/*
 *
 * Actions for categories of Outcome
 *
 */

import * as API from '../../constants/API';
import * as OutcomeActionTypes from '../../actiontypes/schema/outcome';
import request from './../base/request.js';

/**
 * Add category with name
 * @param {String} name
 * @param {String} catId
 * @returns {{type: ADD_CATEGORY, cat: Object}}
 */
export const addCategory = (name, catId) => {
    const url = catId ? API.OUTCOME_CREATE_SUBCATEGORY({ catId }) : API.OUTCOME_CREATE_CATEGORY;

    return request.post(url, { catId, name }, cat => ({
        type: OutcomeActionTypes.ADD_CATEGORY,
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
    const url = itemId ? API.OUTCOME_DELETE_SUBCATEGORY({ itemId, catId }) : API.OUTCOME_DELETE_CATEGORY({ catId });

    return request.del(url, cat => ({
        type: OutcomeActionTypes.DELETE_CATEGORY,
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
    const url = itemId ? API.OUTCOME_UPDATE_SUBCATEGORY({ itemId, catId }) : API.OUTCOME_UPDATE_CATEGORY({ catId });

    return request.update(url, { name }, cat => ({
        type: OutcomeActionTypes.UPDATE_CATEGORY,
        cat
    }));
};

/**
 * Receive categories
 * @param json
 * @returns {{type: RECEIVE_CATEGORIES , data: *}}
 */
function receiveCategories(json) {
    return {
        type: OutcomeActionTypes.RECEIVE_CATEGORIES,
        data: json
    };
}

/**
 * Fetch categories from server
 * @returns {Function}
 */
export const fetchCategories = dispatch => dispatch(request.get(API.OUTCOME_GET, receiveCategories));