'use strict';

/*
 *
 * Actions for categories of Project
 *
 */

import * as API from '../../constants/API';
import * as ProjectActionTypes from '../../actiontypes/schema/project';
import request from './../base/request.js';

/**
 * Add category with name
 * @param {String} name
 * @param {String} catId
 * @returns {{type: ADD_CATEGORY, cat: Object}}
 */
export const addCategory = (name, catId) => {
    const url = catId ? API.PROJECT_CREATE_SUBCATEGORY({ catId }) : API.PROJECT_CREATE_CATEGORY;

    return request.post(url, { catId, name }, cat => {
        return {
            type: ProjectActionTypes.ADD_CATEGORY,
            cat
        }
    });
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
export const fetchCategories = () => request.get(API.PROJECT_GET, receiveCategories);