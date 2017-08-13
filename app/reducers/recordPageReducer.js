'use strict';

/*
 *
 * RecordPage reducer
 *
 */

import _ from 'lodash';
import moment from 'moment';
import * as RecordActionTypes from '../actiontypes/schema/record';
import * as RecordPageActionTypes from '../actiontypes/recordPage';
import { getDateRangeOfCurrentMonth } from '../utils/dateUtils';
import {changeDateRange} from "../actions/recordPage";

const initialState = {
    filter: getDateRangeOfCurrentMonth(),
    list: []
};

/**
 * Record state for updating record
 * @param {Object} oldState
 * @param {Object} record
 * @returns {{filter: *, list: *[]}}
 */
const updateRecord = (oldState, record) => {
    const { filter, list } = oldState;
    const index = _.findIndex(list, { _id: record._id });

    return {
        filter,
        list: [
            ...list.slice(0, index),
            record,
            ...list.slice(index + 1)
        ]
    };
};

/**
 * Check whether record satisfy filter conditions
 * @param {Object} filter
 * @param {Object} record
 * @returns {boolean}
 */
const validateWithFilter = (filter = {}, record = {}) => {
    const { fDate, tDate } = filter;
    const consumeDate = moment(record.consumeDate);

    if (fDate && tDate && consumeDate) {
        return consumeDate.isSameOrAfter(moment(fDate)) && consumeDate.isSameOrBefore(moment(tDate));
    }
    return false;
};

/**
 * Filter records based on filter
 * @param {Object} filter
 * @param {Array} records
 * @returns {Array}
 */
const filterRecords = (filter, records = []) => _.filter(records, record => validateWithFilter(filter, record));

/**
 * Handle receiving records logic
 * @param {Object} filter
 * @param {Array} list
 * @returns {{filter: *, list}}
 */
const receiveRecords = (filter, list) => {
    return filterRecords(filter, list);
};

/**
 * Handle date range changes
 * @param {String} fDate
 * @param {String} tDate
 * @param {Array} list
 * @returns {{filter: {fDate: *, tDate: *}, list: {filter: *, list}}}
 */
const onChangeDateRange = (fDate, tDate, list) => {
    const filter = { fDate, tDate };
    return {
        filter,
        list: receiveRecords(filter, list)
    };
};

function recordReducer(state = initialState, action = {}) {
    const { filter, list } = state;

    switch (action.type) {
        case RecordActionTypes.ADD_RECORD:
            if (_.isEmpty(action.record) || !validateWithFilter(filter, action.record)) {
                return state;
            }

            return {
                filter,
                list: _.sortBy([
                    ...list,
                    action.record
                ], { 'consumeDate': -1 })
            };

        case RecordActionTypes.DELETE_RECORD:
            return {
                filter,
                list: list.filter(record => record._id !== action._id)
            };

        case RecordActionTypes.UPDATE_RECORD:
            if (_.isEmpty(action.record) || !validateWithFilter(filter, action.record)) {
                return;
            }
            return updateRecord(state, action.record);

        case RecordActionTypes.RECEIVE_RECORDS:
            if (!action.data) return state;

            return {
                filter,
                list: receiveRecords(filter, action.data)
            };

        case RecordPageActionTypes.CHANGE_DATERANGE:
            const { fDate, tDate } = action;
            return (fDate && tDate && action.data) ? onChangeDateRange(fDate, tDate, action.data) : state;

        default:
            return state;
    }
}

export default recordReducer;