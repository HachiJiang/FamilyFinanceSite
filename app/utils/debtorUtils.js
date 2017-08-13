'use strict';

/*
 *
 * Utils for debtors
 *
 */

import _ from 'lodash';

/**
 * 获取借入者list, 对应借出款
 * @param {Array} debtors
 */
const getLoanees = debtors => _.filter(debtors, d => d.balance > 0);

/**
 * 获取借出者list, 对应负债款
 * @param {Array} debtors
 */
const getLoaners = debtors => _.filter(debtors, d => d.balance < 0);

/**
 * Get total debt 总负债
 * @param {Array} debtors
 * @returns {number}
 */
const getTotalDebt = debtors => _.sumBy(debtors, d => d.balance < 0 ? d.balance : 0);

const getTotalLoan = debtors => _.sumBy(debtors, d => d.balance > 0 ? d.balance : 0);

export {
    getLoanees,
    getLoaners,
    getTotalDebt,
    getTotalLoan
}