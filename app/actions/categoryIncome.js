/*
 *
 * Actions for categories of Income
 *
 */

import * as CategoryActionTypes from '../actiontypes/category';

/**
 * Add category with name
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: ADD_CATEGORY_INCOME, name: *, indices: *}}
 */
export const addCategory = (name, indices) => {
    return {
        type: CategoryActionTypes.ADD_CATEGORY_INCOME,
        name,
        indices
    };
};

/**
 * Delete category in specific position
 * @param {Array} indices
 * @returns {{type: DELETE_CATEGORY_INCOME, Array: *}}
 */
export const deleteCategory = indices => {
    return {
        type: CategoryActionTypes.DELETE_CATEGORY_INCOME,
        indices
    };
};

/**
 * Update category with name in specific position
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: UPDATE_CATEGORY_INCOME, index: *, name: *}}
 */
export const updateCategory = (name, indices) => {
    return {
        type: CategoryActionTypes.UPDATE_CATEGORY_INCOME,
        name,
        indices
    };
};