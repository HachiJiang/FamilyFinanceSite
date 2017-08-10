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
 * Get account categories with derived data
 * @param {Object} state
 * @returns {Array}
 */
const getCategories = state => {
    const rawList = getAccountCategories(state);

    return _.map(rawList, cat => {
        if (!cat) {
            return;
        }

        let catCopy = _.cloneDeep(cat);

        const balance = _.sumBy(cat.items, item => {
            if (item && item.balance) {
                return _.toNumber(item.balance);
            }
        });

        catCopy.balance = balance ? balance.toFixed(DECIMAL_PRECISION) : 0;
        return catCopy;
    });
};

export {
    getCategories
}