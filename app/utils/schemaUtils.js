'use strict';

import _ from 'lodash';

import { ID_SEPARATOR } from '../constants/Config';

/**
 * Get value of schema category for saving to DB
 * @param {string} catId
 * @param {string} itemId
 * @returns {string}
 */
export const getCategoryVal = (catId, itemId) => {
    if (catId && itemId) {
        return [catId, itemId].join(ID_SEPARATOR);
    }
};

/**
 * Get category name
 * @param {string} idStr
 * @param {Array} categories
 * @returns {string}
 */
export const idStrToName = (idStr, categories) => {
    if (!idStr || !_.isArray(categories)) {
        return;
    }

    const idArr = idStr.split(ID_SEPARATOR);
    const cat = _.find(categories, cat => cat._id === idArr[0]);
    const target = (idArr.length > 1) ? _.find(cat.items, item => item._id === idArr[1]) : cat;

    if (target) {
        return target.name;
    }
};