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

/**
 * Get action for outcome info received
 * @param {Array} amountByDay
 */
const receiveOutcomeInfo = (amountByDay, dateStr) => ({
    type: SummaryPageActionTypes.OUTCOME_BY_DAY_RECEIVED,
    amountByDay,
    dateStr
});

/**
 * Fetch outcome info
 * @param {Object} dispatch
 * @param {String} dateStr
 */
const fetchOutcomeInfo = (dispatch, dateStr) => {
    const date = moment(dateStr, MONTH_FORMAT);
    const { fDate, tDate } = getDateRangeOfMonth(date.year(), date.month());

    dispatch(
        fetchAggregationAmount(OUTCOME, 'consumeDate', fDate, tDate,
                amountByDay => receiveOutcomeInfo(amountByDay, dateStr)
        )
    ); // @TODO: add cat
};

export {
    fetchOutcomeInfo
}