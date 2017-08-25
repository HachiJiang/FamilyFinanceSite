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
import { parseAmountBySubcat, getAmountByCat, parseAmountByMembers, parseAmountByDate } from '../../utils/aggregationUtils';
import { getLoanees, getLoaners, getTotalDebt, getTotalLoan } from '../../utils/debtorUtils';
import { MONTH_FORMAT, DECIMAL_PRECISION } from '../../constants/Config';

const getSummaryPageInfo = state => state.get('summaryPage');

/**
 * Fill item in date range
 * @param {Array} raw
 * @param {number} min
 * @param {number} max
 * @returns {[]}
 */
const fillInRange = (raw = {}, min = 0, max = 0) => {
    let result = [];
    for (let i = min; i <= max; i++) {
        if (!raw[i]) {
            result.push({
                name: i,
                value: 0
            });
        } else {
            result.push({
                name: i,
                value: raw[i].value
            });
        }
    }
    return result;
};

/**
 * Parse incomeByDate and outcomeByDate
 * @param {Array} incomeByDate
 * @param {Array} outcomeByDate
 * @returns {{incomeByDate: *[], outcomeByDate: *[]}}
 */
const parseIncomeOutcomeByDate = (incomeByDate, outcomeByDate) => {
    const incomeData = parseAmountByDate(incomeByDate);
    const outcomeData = parseAmountByDate(outcomeByDate);

    const keys = _.concat(_.keys(incomeData), _.keys(outcomeData));
    const min = _.min(keys);
    const max = _.max(keys);

    return {
        incomeByDate: fillInRange(incomeData, min, max),
        outcomeByDate: fillInRange(outcomeData, min, max)
    };
};

/**
 * Get profit by date
 * @param {Array} incomeByDate
 * @param {Array} outcomeByDate
 * @returns {Array}
 */
const getProfitByDate = (incomeByDate, outcomeByDate) => {
    let result = [];
    _.forEach(incomeByDate, (item, index) => {
        result.push({
            name: item.name,
            value: parseInt(item.value - outcomeByDate[index].value)
        });
    });
    return result;
};

/**
 * Get KPI info
 * @param {Object} state
 * @returns {{totalBalance: string}}
 */
const getTotalInfo = state => {
    const accounts = getAccountCategories(state);
    const debtors = getDebtors(state);
    const total = getSummaryPageInfo(state).total;

    const { incomeByDate, outcomeByDate } = parseIncomeOutcomeByDate(total.incomeByDate, total.outcomeByDate);

    return {
        dateMode: total.dateMode,
        incomeByDate,
        outcomeByDate,
        profitByDate: getProfitByDate(incomeByDate, outcomeByDate),
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