'use strict';

/*
 *
 * Selectors for summaryPage
 *
 */
import _ from 'lodash';
import moment from 'moment';
import { getAccountCategories, getDebtors } from '../App/selectors';
import { getTotalBalance } from '../../utils/accountUtils';
import { getFirstLastDayOfMonth } from '../../utils/dateUtils';
import { getLoanees, getLoaners, getTotalDebt, getTotalLoan } from '../../utils/debtorUtils';
import { MONTH_FORMAT } from '../../constants/Config';

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

const fillAmountInWholeMonth = (dateStr, raw) => {
    const date = moment(dateStr, MONTH_FORMAT);
    const range = getFirstLastDayOfMonth(date.year(), date.month());

    if (!range || raw.length < 1) {
        return raw;
    }

    const lastDay = moment(range.lastDay).format('DD');
    let result = new Array(_.toNumber(lastDay));
    _.fill(result, 0);

    _.forEach(raw, item => {
        const day = moment(item._id).local().format('DD');
        result[_.toNumber(day) - 1] = _.toNumber(item.amount.toFixed(2));
    });
    return result;
};

/**
 * Get outcome info
 * @param {Object} state
 */
const getOutcomeInfo = state => {
    const outcome = state.get('summaryPage').outcome;
    const { dateStr } = outcome;
    return {
        dateStr,
        amountByDay: fillAmountInWholeMonth(dateStr, outcome.amountByDay),
        amountByCat: outcome.amountByCat
    };
};

export {
    getKpiInfo,
    getOutcomeInfo
}