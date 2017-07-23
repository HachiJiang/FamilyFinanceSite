'use strict';

/*
 *
 * Actions for categories of Project
 *
 */

import * as ProjectActionTypes from '../../actiontypes/schema/project';
import request from './../base/request.js';
import { PROJECT_GET } from '../../constants/API';

/**
 * Add category with name
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: ADD_CATEGORY, name: *, indices: *}}
 */
export const addCategory = (name, indices) => {
    return {
        type: ProjectActionTypes.ADD_CATEGORY,
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
        type: ProjectActionTypes.DELETE_CATEGORY,
        indices
    };
};

/**
 * Update category with name in specific position
 * @param {string} name
 * @param {Array} indices
 * @returns {{type: RECEIVE_CATEGORIES, index: *, name: *}}
 */
export const updateCategory = (name, indices) => {
    return {
        type: ProjectActionTypes.UPDATE_CATEGORY,
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
        type: ProjectActionTypes.RECEIVE_CATEGORIES,
        data: json
    };
}

/**
 * Fetch categories from server
 * @returns {Function}
 */
export const fetchCategories = () => {
    return request(PROJECT_GET, receiveCategories);
};