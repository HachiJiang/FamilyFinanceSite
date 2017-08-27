'use strict';

/*
 *
 * Selectors for summaryPage
 *
 */
import _ from 'lodash';
import { getAccountCategories, getDebtors } from '../App/selectors';
import { getTotalBalance } from '../../utils/accountUtils';
import { parseAmountByDate } from '../../utils/aggregationUtils';
import { getLoanees, getLoaners, getTotalDebt, getTotalLoan } from '../../utils/debtorUtils';

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

    if (_.isEmpty(raw)) {
        return result;
    }

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

const getDateKeys = (incomeData = {}, outcomeData = {}) => {
    let keys = {};

    _.forEach(incomeData, (item, key) => {
        keys[key] = _.toNumber(key);
    });

    _.forEach(outcomeData, (item, key) => {
        keys[key] = _.toNumber(key);
    });

    return _.toArray(keys);
};

/**
 * Parse incomeByDate and outcomeByDate
 * @param {Array} incomeByDate
 * @param {Array} outcomeByDate
 * @returns {{incomeByDate: *[], outcomeByDate: *[]}}
 */
const parseIncomeOutcomeByDate = (incomeByDate = [], outcomeByDate = []) => {
    const incomeData = parseAmountByDate(incomeByDate);
    const outcomeData = parseAmountByDate(outcomeByDate);

    const keys = getDateKeys(incomeData, outcomeData);
    if (keys.length < 1) {
        return {};
    }

    const min = _.toNumber(_.min(keys));
    const max = _.toNumber(_.max(keys));

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
const getProfitByDate = (incomeByDate = [], outcomeByDate = []) => {
    let result = [];
    if (incomeByDate.length === outcomeByDate.length) {
        _.forEach(incomeByDate, (item, index) => {
            result.push({
                name: item.name,
                value: parseInt(item.value - outcomeByDate[index].value)
            });
        });
    }
    return result;
};

/**
 * Get KPI info
 * @param {Object} state
 * @returns {Object}
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
 * Get total data
 * @param {Object} state
 * @returns {Object}}
 */
const getTotalData = state => {
    const summaryPage = getSummaryPageInfo(state);
    const { incomeByDate = [], outcomeByDate = [] } = parseIncomeOutcomeByDate(summaryPage.incomeByDate, summaryPage.outcomeByDate);

    return {
        year: summaryPage.year,
        incomeByDate,
        outcomeByDate,
        profitByDate: getProfitByDate(incomeByDate, outcomeByDate)
    };
};

export {
    getKpiInfo,
    getTotalData
}