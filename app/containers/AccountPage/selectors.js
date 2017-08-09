'use strict';

/*
 *
 * Selectors for AccountPage
 *
 */

import _ from 'lodash';
import { getAccountCategories } from '../App/selectors';
import { DECIMAL_PRECISION } from '../../constants/Config';

/**
 * Get balance total
 * @param {Object} cat
 * @returns {number}
 */
const getBalanceTotal = cat => {
    const items = cat && cat.items;
    let total = 0;

    if (!items || items.length < 1) {
        return total;
    }

    _.forEach(items, item => {
        if (item && item.balance) {
            total += _.toNumber(item.balance);
        }
    });
    return _.toNumber(total.toFixed(DECIMAL_PRECISION));
};

/**
 * Get account categories with derived data
 * @param {Object} state
 * @returns {Array}
 */
const getCategories = state => {
    const rawList = getAccountCategories(state);

    return _.map(rawList, cat => {
        let catCopy = _.cloneDeep(cat);
        catCopy.balance = getBalanceTotal(cat);
        return catCopy;
    });
};

export {
    getCategories
}