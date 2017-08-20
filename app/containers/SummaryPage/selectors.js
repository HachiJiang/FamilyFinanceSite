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
import { idStrToNames, idStrToName } from '../../utils/recordUtils';
import { getLoanees, getLoaners, getTotalDebt, getTotalLoan } from '../../utils/debtorUtils';
import { MONTH_FORMAT, ID_SEPARATOR, DECIMAL_PRECISION } from '../../constants/Config';

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
        result[_.toNumber(day) - 1] = _.toNumber(item.amount.toFixed(DECIMAL_PRECISION));
    });
    return result;
};

/**
 * Get amountBySubcat
 * @param {Array} raw
 * @param {Array}categories
 * @returns {Array}
 */
const parseAmountBySubcat = (raw, categories = []) =>
    categories.length > 0 ?  _.map(raw, item => {
        const { amount } = item;
        const names = idStrToNames(item._id, categories);
        if (!_.isArray(names) || names.length < 1) {
            return;
        }

        return {
            cat: names[1],
            name: names[0],
            value: amount
        };
    }) : [];

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

    return _.map(result, ({ name, value }) => ({
        name,
        value: _.toNumber(value.toFixed(DECIMAL_PRECISION))
    }));
};

/**
 * Parse amountByMembers
 * @param {Array} raw
 * @param {Array} members
 * @returns {Array}
 */
const parseAmountByMembers = (raw, members = []) =>
    members.length > 0 ? _.map(raw, item => {
        const { amount } = item;
        const name = idStrToName(item._id, members);

        return {
            name: name,
            value: amount
        };
    }) : [];

/**
 * Get outcome info
 * @param {Object} state
 */
const getOutcomeInfo = state => {
    const outcome = state.get('summaryPage').outcome;
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
    getKpiInfo,
    getOutcomeInfo
}