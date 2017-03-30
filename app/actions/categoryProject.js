/*
 *
 * Actions for categories of Project
 *
 */

import * as CategoryActionTypes from '../actiontypes/category';

/**
 * Add category with name
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: ADD_CATEGORY_PROJECT, name: *, indices: *}}
 */
export const addCategory = (name, indices) => {
    return {
        type: CategoryActionTypes.ADD_CATEGORY_PROJECT,
        name,
        indices
    };
};

/**
 * Delete category in specific position
 * @param {Array} indices
 * @returns {{type: DELETE_CATEGORY_PROJECT, Array: *}}
 */
export const deleteCategory = indices => {
    return {
        type: CategoryActionTypes.DELETE_CATEGORY_PROJECT,
        indices
    };
};

/**
 * Update category with name in specific position
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: UPDATE_CATEGORY_PROJECT, index: *, name: *}}
 */
export const updateCategory = (name, indices) => {
    return {
        type: CategoryActionTypes.UPDATE_CATEGORY_PROJECT,
        name,
        indices
    };
};