/*
 *
 * Actions for categories of Outcome
 *
 */

import * as CategoryActionTypes from '../actiontypes/category';
import { OUTCOME_GET } from '../constants/API';

/**
 * Add category with name
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: OUTCOME_ADD_CATEGORY, name: *, indices: *}}
 */
export const addCategory = (name, indices) => {
    return {
        type: CategoryActionTypes.OUTCOME_ADD_CATEGORY,
        name,
        indices
    };
};

/**
 * Delete category in specific position
 * @param {Array} indices
 * @returns {{type: OUTCOME_DELETE_CATEGORY, Array: *}}
 */
export const deleteCategory = indices => {
    return {
        type: CategoryActionTypes.OUTCOME_DELETE_CATEGORY,
        indices
    };
};

/**
 * Update category with name in specific position
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: UPDATE_CATEGORY_OUTCOME, index: *, name: *}}
 */
export const updateCategory = (name, indices) => {
    return {
        type: CategoryActionTypes.UPDATE_CATEGORY_OUTCOME,
        name,
        indices
    };
};

/**
 * Receive account categories
 * @param json
 * @returns {{type: OUTCOME_RECEIVE_CATEGORIES, cats: *}}
 */
function receiveCategories(json) {
    return {
        type: CategoryActionTypes.OUTCOME_RECEIVE_CATEGORIES,
        cats: json
    };
}

/**
 * Fetch accounts from server
 * @returns {Function}
 */
export const fetchCategories = () => {
    return dispatch => {
        return fetch(OUTCOME_GET)
            .then(res => res.json())
            .then(json => dispatch(receiveCategories(json)));
    };
};