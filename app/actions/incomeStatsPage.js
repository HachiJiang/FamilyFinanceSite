'use strict';

/*
 *
 * Actions for IncomeStatsPage
 *
 */
import moment from 'moment';
import * as IncomeStatsPageActionTypes from '../actiontypes/incomeStatsPage';
import { fetchAggregationAmount } from './aggregation';
import { INCOME } from '../constants/EnumRecordType.js';

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

    dispatch(
        fetchAggregationAmount(INCOME, 'year', receiveAmountByDate)
    );

    dispatch(
        fetchAggregationAmount(INCOME, 'category', receiveAmountByCat)
    );

    dispatch(
        fetchAggregationAmount(INCOME, 'member', receiveAmountByMember)
    );

    dispatch(
        fetchAggregationAmount(INCOME, 'member-year', receiveAmountByDateAndMember)
    );

    dispatch(
        fetchAggregationAmount(INCOME, 'member-category', receiveAmountByCatAndMember)
    );
};

export {
    fetchData
}