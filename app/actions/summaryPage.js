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
import { OUTCOME } from '../constants/EnumRecordType.js';
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
 * Fetch outcome info
 * @param {Object} dispatch
 * @param {String} dateStr
 */
const fetchOutcomeInfo = (dispatch, dateStr) => {
    const date = moment(dateStr, MONTH_FORMAT);
    const { fDate, tDate } = getDateRangeOfMonth(date.year(), date.month());

    dispatch(changeMonth(dateStr));

    dispatch(
        fetchAggregationAmount(OUTCOME, 'consumeDate', fDate, tDate, receiveAmountByDay)
    );

    dispatch(
        fetchAggregationAmount(OUTCOME, 'category', fDate, tDate, receiveAmountByCat)
    );

    dispatch(
        fetchAggregationAmount(OUTCOME, 'member', fDate, tDate, receiveAmountByMember)
    );
};

export {
    fetchOutcomeInfo
}