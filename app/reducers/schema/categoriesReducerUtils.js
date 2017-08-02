'use strict';

/*
 *
 * Utils for category reducers
 *
 */
import _ from 'lodash';

/**
 * Add/Update category, update category for adding new subcategory
 * @param {Array} state
 * @param {Object} cat
 * @returns {Array}
 */
export const updateCategory = (state, cat) => {
    if (!cat || !cat.name) {
        return state;
    }

    const index = _.findIndex(state, { _id: cat._id });

    if (index !== -1) { // if exist, update category
        return [
            ...state.slice(0, index),
            cat,
            ...state.slice(index + 1)
        ];
    } else {            // if not exist, add new one
        return [
            ...state,
            cat
        ];
    }
};

/**
 * Delete category
 * @param {Array} state
 * @param {Object} cat
 * @param {String} itemId
 * @returns {Array}
 */
export const deleteCategory = (state, cat, itemId) => {
    if (itemId) {
        return updateCategory(state, cat);
    } else {
        return _.filter(state, item => item._id !== cat._id);
    }
};