'use strict';

/*
 *
 * RecordPage reducer
 *
 */

import _ from 'lodash';
import moment from 'moment';

// Action types
import * as RecordActionTypes from '../actiontypes/schema/record';
import * as RecordPageActionTypes from '../actiontypes/recordPage';

// Utils
import { getCurrentMonth, getDateRangeOfMonth } from '../utils/dateUtils';

// Constant
import { MONTH_FORMAT } from '../constants/Config';

const initialState = {
    month: getCurrentMonth(),
    list: [],
    outcome: {
        amountByDay: [],
        amountByCat: [],
        amountByMember: []
    }
};

/**
 * Record state for updating record
 * @param {Object} oldState
 * @param {Object} record
 * @returns {Object}
 */
const updateRecord = (oldState, record) => {
    const { list } = oldState;
    const index = _.findIndex(list, { _id: record._id });

    return {
        ...oldState,
        list: [
            ...list.slice(0, index),
            record,
            ...list.slice(index + 1)
        ]
    };
};

/**
 * Check whether record satisfy filter conditions
 * @param {String} month
 * @param {Object} record
 * @returns {boolean}
 */
const validateWithFilter = (month = '', record = {}) => {
    const { fDate, tDate } = getDateRangeOfMonth(moment(month, MONTH_FORMAT));
    const consumeDate = moment(record.consumeDate);

    if (fDate && tDate && consumeDate) {
        return consumeDate.isSameOrAfter(moment(fDate)) && consumeDate.isSameOrBefore(moment(tDate));
    }
    return false;
};

/**
 * Handle receiving records logic
 * @param {String} month
 * @param {Array} records
 * @returns {Array}
 */
const receiveRecords = (month, records = []) => _.filter(records, record => validateWithFilter(month, record));

function recordPageReducer(state = initialState, action = {}) {
    const { month, list, outcome } = state;

    switch (action.type) {
        case RecordActionTypes.ADD_RECORD:
            if (_.isEmpty(action.record) || !validateWithFilter(month, action.record)) {
                return state;
            }

            return {
                ...state,
                list: _.sortBy([
                    ...list,
                    action.record
                ], { 'consumeDate': -1 })
            };

        case RecordActionTypes.DELETE_RECORD:
            return {
                ...state,
                list: list.filter(record => record._id !== action._id)
            };

        case RecordActionTypes.UPDATE_RECORD:
            if (_.isEmpty(action.record) || !validateWithFilter(month, action.record)) {
                return state;
            }
            return updateRecord(state, action.record);

        case RecordActionTypes.RECEIVE_RECORDS:
            return action.data ? {
                ...state,
                list: receiveRecords(month, action.data)
            } : state;

        case RecordPageActionTypes.CHANGE_MONTH:
            return {
                ...state,
                month: action.month
            };

        case RecordPageActionTypes.OUTCOME_BY_DAY_RECEIVED:
            return {
                ...state,
                outcome: {
                    ...outcome,
                    amountByDay: action.amountByDay
                }
            };

        case RecordPageActionTypes.OUTCOME_BY_CAT_RECEIVED:
            return {
                ...state,
                outcome: {
                    ...outcome,
                    amountByCat: action.amountByCat
                }
            };


        case RecordPageActionTypes.OUTCOME_BY_MEMBER_RECEIVED:
            return {
                ...state,
                outcome: {
                    ...outcome,
                    amountByMember: action.amountByMember
                }
            };

        default:
            return state;
    }
}

export default recordPageReducer;