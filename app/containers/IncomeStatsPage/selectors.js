'use strict';

/*
 *
 * Selectors for summaryPage
 *
 */

import { getIncomeCategories, getMembers } from '../App/selectors';
import { parseAmountBySubcat, getAmountByCat, parseAmountByMembers } from '../../utils/aggregationUtils';

/**
 * Get amountByDate
 * @param {Array} raw
 * @returns {Array}
 */
const parseAmountByDate = (raw = []) =>
    _.map(raw, item => {
        return {
            name: item._id.year,
            value: item.value
        };
    });

/**
 * Get
 * @param state
 */
const getData = state => {
    const data = state.get('incomeStatsPage');
    const { year, amountByDate, amountByMember, amountByCat } = data;
    const amountBySubcat = parseAmountBySubcat(amountByCat, getIncomeCategories(state));

    return {
        year,
        amountByDate: parseAmountByDate(amountByDate),
        amountByCat: getAmountByCat(amountBySubcat),
        amountBySubcat: amountBySubcat,
        amountByMember: parseAmountByMembers(amountByMember, getMembers(state))
    };
};

export {
    getData
}