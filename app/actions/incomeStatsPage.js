'use strict';

/*
 *
 * Actions for IncomeStatsPage
 *
 */

import * as IncomeStatsPageActionTypes from '../actiontypes/incomeStatsPage';
import { fetchAggregationAmount } from './aggregation';
import { INCOME } from '../constants/EnumRecordType.js';
import { getDateRangeOfYear } from '../utils/dateUtils';

/**
 * Change year filter
 * @param {String} year
 */
const changeYear = year => ({
    type: IncomeStatsPageActionTypes.SELECT_YEAR,
    year
});

/**
 * Get action for amountByDate received
 * @param {Array} amountByDate
 */
const receiveAmountByDate = amountByDate => ({
    type: IncomeStatsPageActionTypes.AMOUNT_BY_DATE_RECEIVED,
    amountByDate
});

/**
 * Get action for amountByCat received
 * @param {Array} amountByCat
 */
const receiveAmountByCat = amountByCat => ({
    type: IncomeStatsPageActionTypes.AMOUNT_BY_CAT_RECEIVED,
    amountByCat
});

/**
 * Get action for amountByCat received
 * @param {Array} amountByMember
 */
const receiveAmountByMember = amountByMember => ({
    type: IncomeStatsPageActionTypes.AMOUNT_BY_MEMBER_RECEIVED,
    amountByMember
});

/**
 * Get action for amountByDateAndMember received
 * @param {Array} amountByDateAndMember
 */
const receiveAmountByDateAndMember = amountByDateAndMember => ({
    type: IncomeStatsPageActionTypes.AMOUNT_BY_DATE_MEMBER_RECEIVED,
    amountByDateAndMember
});

/**
 * Get action for amountByCatAndMember received
 * @param {Array} amountByCatAndMember
 */
const receiveAmountByCatAndMember = amountByCatAndMember => ({
    type: IncomeStatsPageActionTypes.AMOUNT_BY_CAT_MEMBER_RECEIVED,
    amountByCatAndMember
});

/**
 * Fetch outcome info
 * @param {Object} dispatch
 * @param {String} year
 */
const fetchData = (dispatch, year) => {
    dispatch(changeYear(year));

    const { fDate, tDate } = getDateRangeOfYear(year);

    dispatch(
        fetchAggregationAmount(INCOME, year ? 'month' : 'year', receiveAmountByDate, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(INCOME, 'category', receiveAmountByCat, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(INCOME, 'member', receiveAmountByMember, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(INCOME, year ? 'member-month' : 'member-year', receiveAmountByDateAndMember, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(INCOME, 'member-category', receiveAmountByCatAndMember, fDate, tDate)
    );
};

export {
    fetchData
}