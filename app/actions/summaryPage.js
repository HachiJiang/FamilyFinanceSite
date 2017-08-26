'use strict';

/*
 *
 * Actions for SummaryPage
 *
 */
import * as SummaryPageActionTypes from '../actiontypes/summaryPage';
import { fetchAggregationAmount } from './aggregation';
import { OUTCOME, INCOME } from '../constants/EnumRecordType.js';

/**
 * Get action for changing dateMode of total
 * @param {String} dateMode
 */
const changeDateModeForTotal = dateMode => ({
    type: SummaryPageActionTypes.CHANGE_TOTAL_DATE_MODE,
    dateMode
});

/**
 * Get action for changing dateMode of total
 * @param {Array} outcomeByDate
 */
const receiveOutcomeByDate = outcomeByDate => ({
    type: SummaryPageActionTypes.TOTAL_OUTCOME_BY_DATE_RECEIVED,
    outcomeByDate
});

/**
 * Get action for changing dateMode of total
 * @param {Array} incomeByDate
 */
const receiveIncomeByDate = incomeByDate => ({
    type: SummaryPageActionTypes.TOTAL_INCOME_BY_DATE_RECEIVED,
    incomeByDate
});

/**
 * Fetch outcome
 * @param dispatch
 * @param dateMode
 */
const fetchTotalInfo = (dispatch, dateMode) => {
    dispatch(changeDateModeForTotal(dateMode));

    dispatch(
        fetchAggregationAmount(OUTCOME, dateMode, receiveOutcomeByDate)
    );

    dispatch(
        fetchAggregationAmount(INCOME, dateMode, receiveIncomeByDate)
    );
};

export {
    fetchTotalInfo
}