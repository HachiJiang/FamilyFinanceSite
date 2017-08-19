'use strict';

/*
 *
 * Selectors for summaryPage
 *
 */
import _ from 'lodash';
import moment from 'moment';
import { getAccountCategories, getDebtors, getOutcomeCategories } from '../App/selectors';
import { getTotalBalance } from '../../utils/accountUtils';
import { getFirstLastDayOfMonth } from '../../utils/dateUtils';
import { idStrToNames } from '../../utils/recordUtils';
import { getLoanees, getLoaners, getTotalDebt, getTotalLoan } from '../../utils/debtorUtils';
import { MONTH_FORMAT, ID_SEPARATOR } from '../../constants/Config';

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
        const day = moment(item._id).local().format('DD');
        result[_.toNumber(day) - 1] = _.toNumber(item.amount.toFixed(2));
    });
    return result;
};

/**
 * Get amountBySubcat
 * @param {Array} raw
 * @param {Array}categories
 * @returns {Array}
 */
const getAmountBySubcat = (raw, categories) => _.map(raw, item => {
    const { amount } = item;
    const names = idStrToNames(item._id, categories);

    return {
        cat: names[0],
        name: names[1],
        value: amount
    };
});

/**
 * Get amountByCat
 * @param {Array} amountBySubcat
 * @returns {Array}
 */
const getAmountByCat = amountBySubcat => {
    let result = {};
    _.forEach(amountBySubcat, item => {
        const { cat, value } = item;
        if (!result[cat]) {
            result[cat] = {
                name: item.name,
                value
            };
        } else {
            result[cat].value += value;
        }
    });
    return _.toArray(result);
};

/**
 * Get outcome info
 * @param {Object} state
 */
const getOutcomeInfo = state => {
    const outcome = state.get('summaryPage').outcome;
    const { dateStr } = outcome;
    const amountBySubcat = getAmountBySubcat(outcome.amountByCat, getOutcomeCategories(state));
    return {
        dateStr,
        amountByDay: fillAmountInWholeMonth(dateStr, outcome.amountByDay),
        amountByCat: getAmountByCat(amountBySubcat),
        amountBySubcat: amountBySubcat
    };
};

export {
    getKpiInfo,
    getOutcomeInfo
}