'use strict';

/*
 *
 * Selectors for summaryPage
 *
 */
import _ from 'lodash';
import moment from 'moment';
import { getAccountCategories, getDebtors, getOutcomeCategories, getMembers } from '../App/selectors';
import { getTotalBalance } from '../../utils/accountUtils';
import { getFirstLastDayOfMonth } from '../../utils/dateUtils';
import { parseAmountBySubcat, getAmountByCat, parseAmountByMembers } from '../../utils/aggregationUtils';
import { getLoanees, getLoaners, getTotalDebt, getTotalLoan } from '../../utils/debtorUtils';
import { MONTH_FORMAT, DECIMAL_PRECISION } from '../../constants/Config';

const getSummaryPageInfo = state => state.get('summaryPage');

/**
 * Get KPI info
 * @param {Object} state
 * @returns {{totalBalance: string}}
 */
const getTotalInfo = state => {
    const accounts = getAccountCategories(state);
    const debtors = getDebtors(state);
    const total = getSummaryPageInfo(state).total;

    return {
        ...total,
        totalBalance: getTotalBalance(accounts),
        loaners: getLoaners(debtors),  // 借出者
        loanees: getLoanees(debtors),  // 借入者
        totalDebt: getTotalDebt(debtors),
        totalLoan: getTotalLoan(debtors)
    };
};

/**
 * Fill amount for each day
 * @param {String} dateStr
 * @param {Array} raw
 * @returns {Array}
 */
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
        const day = item._id.day;
        result[_.toNumber(day) - 1] = _.toNumber(item.value.toFixed(DECIMAL_PRECISION));
    });
    return result;
};

/**
 * Get outcome info
 * @param {Object} state
 */
const getOutcomeInfo = state => {
    const outcome = getSummaryPageInfo(state).outcome;
    const { dateStr, amountByMember } = outcome;
    const amountBySubcat = parseAmountBySubcat(outcome.amountByCat, getOutcomeCategories(state));

    return {
        dateStr,
        amountByDay: fillAmountInWholeMonth(dateStr, outcome.amountByDay),
        amountByCat: getAmountByCat(amountBySubcat),
        amountBySubcat: amountBySubcat,
        amountByMember: parseAmountByMembers(amountByMember, getMembers(state))
    };
};

export {
    getTotalInfo,
    getOutcomeInfo
}