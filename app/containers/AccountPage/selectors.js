'use strict';

/*
 *
 * Selectors for AccountPage
 *
 */

import _ from 'lodash';
import { getAccountCategories } from '../App/selectors';

/**
 * Get account categories with derived data
 * @param {Object} state
 * @returns {Array}
 */
const getCategories = state => getAccountCategories(state);

/**
 * Get names of all accounts
 * @param {Array} accounts
 * @returns {Array}
 */
const getAllAccountNames = accounts => {
    let names = [];
    _.forEach(accounts, cat => {
        const items = cat && cat.items;
        if (items) {
            names = _.concat(names, _.map(items, item => item.name));
        }
    });
    return names;
};

/**
 * Get data of category for pie chart
 * @param {Array} accounts
 * @returns {Array}
 */
const getCatDataForPie = accounts => {
    const data = _.map(accounts, cat => {
        if (cat) {
            return {
                value: cat.balance,
                name: cat.name
            };
        }
    });

    if (data && data.length > 0) {
        data[0].selected = true;
    }
    return data;
};

/**
 * Get data of accounts for pie chart
 * @param {Array} accounts
 * @returns {Array}
 */
const getAccountDataForPie = accounts => {
    let data = [];
    _.forEach(accounts, cat => {
        const items = cat && cat.items;
        if (items) {
            data = _.concat(data, _.map(items, item => ({
                value: item.balance.toFixed(2),
                name: item.name
            })));
        }
    });
    return data;
};

export {
    getCategories,
    getAllAccountNames,
    getCatDataForPie,
    getAccountDataForPie
}