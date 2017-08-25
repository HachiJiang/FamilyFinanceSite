'use strict';

/*
 *
 * Actions for SummaryPage
 *
 */
import moment from 'moment';
import * as SummaryPageActionTypes from '../actiontypes/summaryPage';
import { fetchAggregationAmount } from './aggregation';
import { getDateRangeOfMonth } from '../utils/dateUtils';
import { OUTCOME, INCOME } from '../constants/EnumRecordType.js';
import { MONTH_FORMAT } from '../constants/Config';

const changeMonth = dateStr => ({
    type: SummaryPageActionTypes.CHANGE_MONTH,
    dateStr
});

/**
 * Get action for amountByDay received
 * @param {Array} amountByDay
 */
const receiveAmountByDay = amountByDay => ({
    type: SummaryPageActionTypes.OUTCOME_BY_DAY_RECEIVED,
    amountByDay
});

/**
 * Get action for amountByCat received
 * @param {Array} amountByCat
 */
const receiveAmountByCat = amountByCat => ({
    type: SummaryPageActionTypes.OUTCOME_BY_CAT_RECEIVED,
    amountByCat
});

/**
 * Get action for amountByCat received
 * @param {Array} amountByMember
 */
const receiveAmountByMember = amountByMember => ({
    type: SummaryPageActionTypes.OUTCOME_BY_MEMBER_RECEIVED,
    amountByMember
});

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

/**
 * Fetch outcome info
 * @param {Object} dispatch
 * @param {String} dateStr
 */
const fetchOutcomeInfo = (dispatch, dateStr) => {
    const date = moment(dateStr, MONTH_FORMAT);
    const { fDate, tDate } = getDateRangeOfMonth(date.year(), date.month());

    dispatch(changeMonth(dateStr));

    dispatch(
        fetchAggregationAmount(OUTCOME, 'day', receiveAmountByDay, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(OUTCOME, 'category', receiveAmountByCat, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(OUTCOME, 'member', receiveAmountByMember, fDate, tDate)
    );
};

export {
    fetchTotalInfo,
    fetchOutcomeInfo
}