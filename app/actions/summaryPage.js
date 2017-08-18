'use strict';

/*
 *
 * Actions for SummaryPage
 *
 */

import * as SummaryPageActionTypes from '../actions/summaryPage';
import { fetchAggregationAmount } from './aggregation';

/**
 * Get actions for outcome info received
 * @param {Array} data
 */
const receiveOutcomeInfo = data => ({
    type: SummaryPageActionTypes.OUTCOME_BY_DAY_RECEIVED,
    data
});

/**
 * Fetch outcome info
 * @param {Object} dispatch
 * @param {String} type: record type
 * @param {String} groupId: amount will be grouped by this id
 * @param {String} fDate
 * @param {String} tDate
 */
const fetchOutcomeInfo = (dispatch, type, groupId, fDate, tDate) => {
    dispatch(fetchAggregationAmount(type, groupId, fDate, tDate, receiveOutcomeInfo)); // @TODO: add cat
};

export {
    fetchOutcomeInfo
}