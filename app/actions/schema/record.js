'use strict';

/*
 *
 * Actions for records
 *
 */

import * as API from '../../constants/API';
import * as RecordActionTypes from '../../actiontypes/schema/record';
import request from './../base/request.js';

/**
 * Add record
 * @param {Object} record
 * @returns {{type: ADD_RECORD, record: Object}}
 */
export const addRecord = record => request.post(API.RECORD_CREATE, record, record => {
    return {
        type: RecordActionTypes.ADD_RECORD,
        record
    }
});

/**
 * Delete record of specific id
 * @param {String} rid: record id
 * @returns {{type: DELETE_RECORD, id: *}}
 */
export const deleteRecord = rid => request.del(API.RECORD_DELETE({ rid }), ({ _id }) => {
    return {
        type: RecordActionTypes.DELETE_RECORD,
        _id // the id of deleted record, id = '' means deletion failed
    }
});

/**
 * Update record of specific id
 * @param {String} rid
 * @param {Object} record
 * @returns {{type: UPDATE_RECORD, id: *, record: *}}
 */
export const updateRecord = (rid, record) => request.update(API.RECORD_UPDATE({ rid }), record, newRecord => {
    return {
        type: RecordActionTypes.UPDATE_RECORD,
        record: newRecord // the id of deleted record, id = '' means deletion failed
    }
});

/**
 * Receive records @TODO: add condition
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
 * Fetch records from server @TODO: add condition
 * @returns {Function}
 */
export const fetchRecords = () => request.get(API.RECORD_GET, receiveRecords);