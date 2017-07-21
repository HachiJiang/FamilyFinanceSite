/*
 *
 * RecordPage reducer
 *
 */

import records from '../../data/records';
import * as RecordActionTypes from '../../actiontypes/record';

const initialState = records || {
    filter: {},
    list: [] // all records???
};

function recordReducer(state = initialState, action = {}) {
    // @TODO: check whether the record satisfy filter

    const { filter, list } = state;

    switch (action.type) {
        case RecordActionTypes.ADD_RECORD:
            return {
                filter,
                list: [
                    ...list,
                    action.record
                ]
            };

        case RecordActionTypes.DELETE_RECORD:
            return {
                filter,
                list: list.filter(record => record.id !== action.id)
            };

        case RecordActionTypes.UPDATE_RECORD:
            console.log('update record');

        default:
            return state;
    }
}

export default recordReducer;