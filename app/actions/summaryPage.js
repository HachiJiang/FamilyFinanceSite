'use strict';

/*
 *
 * Actions for SummaryPage
 *
 */
import * as SummaryPageActionTypes from '../actiontypes/summaryPage';
import { fetchAggregationAmount } from './aggregation';
import { OUTCOME, INCOME } from '../constants/EnumRecordType.js';
import { getDateRangeOfYear } from '../utils/dateUtils';

/**
 * Get action for changing year of total
 * @param {String} year
 */
const selectYear = year => ({
    type: SummaryPageActionTypes.SELECT_YEAR,
    year
});

/**
 * Get action for receiving outcomeByDate
 * @param {Array} outcomeByDate
 */
const receiveOutcomeByDate = outcomeByDate => ({
    type: SummaryPageActionTypes.TOTAL_OUTCOME_BY_DATE_RECEIVED,
    outcomeByDate
});

/**
 * Get action for receiving incomeByDate
 * @param {Array} incomeByDate
 */
const receiveIncomeByDate = incomeByDate => ({
    type: SummaryPageActionTypes.TOTAL_INCOME_BY_DATE_RECEIVED,
    incomeByDate
});

/**
 * Fetch outcome
 * @param dispatch
 * @param year
 */
const fetchTotalInfo = (dispatch, year) => {
    dispatch(selectYear(year));

    const { fDate, tDate } = getDateRangeOfYear(year);
    const groupBy = year ? 'month' : 'year';

    dispatch(
        fetchAggregationAmount(OUTCOME, groupBy, receiveOutcomeByDate, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(INCOME, groupBy, receiveIncomeByDate, fDate, tDate)
    );
};

export {
    fetchTotalInfo
}