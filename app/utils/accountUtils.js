'use strict';

/*
 *
 * Utils for accounts
 *
 */
import { DECIMAL_PRECISION } from '../constants/Config';

/**
 * Get accounts with balance
 * @param {Array} accounts
 * @returns {Array}
 */
const getAccountsWithBalance = accounts => _.map(accounts, cat => {
    if (!cat) {
        return;
    }

    let catCopy = _.cloneDeep(cat);

    const balance = _.sumBy(cat.items, item => {
        if (item && item.balance) {
            return _.toNumber(item.balance);
        }
    });

    catCopy.balance = balance ? _.toNumber(balance.toFixed(DECIMAL_PRECISION)) : 0;
    return catCopy;
});

/**
 * Get balance total
 * @param {Array} accounts
 * @returns {number}
 */
const getTotalBalance = accounts => _.toNumber(_.sumBy(accounts, cat => _.toNumber(cat.balance)).toFixed(DECIMAL_PRECISION));

export {
    getAccountsWithBalance,
    getTotalBalance
}