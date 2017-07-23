/*
 *
 * Actions for records
 *
 */

import * as RecordActionTypes from '../../actiontypes/record';

/**
 * Add record
 * @param {Object} record
 * @returns {{type: ADD_RECORD, record: *}}
 */
export const addRecord = record => {
    return {
        type: RecordActionTypes.ADD_RECORD,
        record
    };
};

/**
 * Delete record of specific id
 * @param {String} id
 * @returns {{type: DELETE_RECORD, id: *}}
 */
export const deleteRecord = id => {
    return {
        type: RecordActionTypes.DELETE_RECORD,
        id
    };
};

/**
 * Update record of specific id
 * @param {String} id
 * @param {Object} record
 * @returns {{type: UPDATE_RECORD, id: *, record: *}}
 */
export const updateRecord = (id, record) => {
    return {
        type: RecordActionTypes.UPDATE_RECORD,
        id,
        record
    };
};