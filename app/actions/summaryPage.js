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
 * Get action for amountByDay received
 * @param {Array} amountByDay
 */
const receiveAmountByDay = (amountByDay, dateStr) => ({
    type: SummaryPageActionTypes.OUTCOME_BY_DAY_RECEIVED,
    amountByDay,
    dateStr
});

/**
 * Get action for amountByCat received
 * @param {Array} amountByCat
 */
const receiveAmountByCat = (amountByCat, dateStr) => ({
    type: SummaryPageActionTypes.OUTCOME_BY_CAT_RECEIVED,
    amountByCat,
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
                amountByDay => receiveAmountByDay(amountByDay, dateStr)
        )
    );

    dispatch(
        fetchAggregationAmount(OUTCOME, 'category', fDate, tDate,
                amountByCat => receiveAmountByCat(amountByCat, dateStr)
        )
    );
};

export {
    fetchOutcomeInfo
}