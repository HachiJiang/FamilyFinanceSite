'use strict';

/*
 *
 * Actions for records
 *
 */

import * as API from '../../constants/API';
import * as RecordActionTypes from '../../actiontypes/schema/record';
import request from './../base/request.js';
import * as messageUtils from '../../utils/messageUtils';

/**
 * Add record
 * @TODO: validation部分在RecordEditor实现, 如有其它编辑入口, 请将validation移至此处
 * @param {Object} record
 * @returns {{type: ADD_RECORD, record: Object}}
 */
export const addRecord = record => request.post(API.RECORD_CREATE, record, record => ({
    type: RecordActionTypes.ADD_RECORD,
    record
}));

/**
 * Delete record of specific id
 * @param {String} rid: record id
 * @returns {{type: DELETE_RECORD, id: *}}
 */
export const deleteRecord = rid => request.del(API.RECORD_DELETE({ rid }), ({ _id }) => ({
    type: RecordActionTypes.DELETE_RECORD,
    _id // the id of deleted record, id = '' means deletion failed
}));

/**
 * Update record of specific id
 * @TODO: validation部分在RecordEditor实现, 如有其它编辑入口, 请将validation移至此处
 * @param {String} rid
 * @param {Object} record
 * @returns {{type: UPDATE_RECORD, id: *, record: *}}
 */
export const updateRecord = (rid, record) => request.update(API.RECORD_UPDATE({ rid }), record, newRecord => ({
    type: RecordActionTypes.UPDATE_RECORD,
    record: newRecord // the id of deleted record, id = '' means deletion failed
}));

/**
 * Receive records
 * @param json
 * @returns {{type: RECEIVE_RECORDS, data: *}}
 */
function receiveRecords(json) {
    return {
        type: RecordActionTypes.RECEIVE_RECORDS,
        data: json
    };
}

/**
 * Fetch records from server
 * @param {String} fDate
 * @param {String} tDate
 * @param {Function} callback
 * @returns {Function}
 */
export const fetchRecords = (fDate, tDate, callback = '') => {
    if (fDate && fDate.isValid() && tDate && tDate.isValid()) {
        return request.get(
            API.RECORD_GET_BY_DATE({ fDate: fDate.toISOString(), tDate: tDate.toISOString() }),
            callback ? callback : receiveRecords
        );
    } else {
        messageUtils.invalidParamFailure();
    }
};