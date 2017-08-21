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
    type: IncomeStatsPageActionTypes.CHANGE_YEAR,
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
};

export {
    fetchData
}