'use strict';

/*
 *
 * Actions for categories of Outcome
 *
 */

import * as OutcomeActionTypes from '../../actiontypes/schema/outcome';
import request from './../base/request.js';
import { OUTCOME_GET } from '../../constants/API';

/**
 * Add category with name
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: ADD_CATEGORY, name: *, indices: *}}
 */
export const addCategory = (name, indices) => {
    return {
        type: OutcomeActionTypes.ADD_CATEGORY,
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
        type: OutcomeActionTypes.DELETE_CATEGORY,
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
        type: OutcomeActionTypes.UPDATE_CATEGORY,
        name,
        indices
    };
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
export const fetchCategories = () => {
    return request(OUTCOME_GET, receiveCategories);
};