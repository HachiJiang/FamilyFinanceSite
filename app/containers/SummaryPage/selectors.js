'use strict';

/*
 *
 * Selectors for summaryPage
 *
 */

import { getAccountCategories, getDebtors } from '../App/selectors';
import { getTotalBalance } from '../../utils/accountUtils';
import { getLoanees, getLoaners, getTotalDebt, getTotalLoan } from '../../utils/debtorUtils';

/**
 * Get KPI info
 * @param {Object} state
 * @returns {{totalBalance: string}}
 */
const getKpiInfo = state => {
    const accounts = getAccountCategories(state);
    const debtors = getDebtors(state);

    return {
        totalBalance: getTotalBalance(accounts),
        loaners: getLoaners(debtors),  // 借出者
        loanees: getLoanees(debtors),  // 借入者
        totalDebt: getTotalDebt(debtors),
        totalLoan: getTotalLoan(debtors)
    };
};

/**
 * Get outcome info
 * @param {Object} state
 */
const getOutcomeInfo = state => state.get('summaryPage').outcome;

export {
    getKpiInfo,
    getOutcomeInfo
}