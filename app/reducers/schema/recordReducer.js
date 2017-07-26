'use strict';

/*
 *
 * RecordPage reducer
 *
 */

import _ from 'lodash';
import * as RecordActionTypes from '../../actiontypes/schema/record';

const initialState = {
    filter: {
        from: '2017.04.01',  // @TODO: remove
        to: '2017.04.31'
    },
    list: [] // all records???
};

function recordReducer(state = initialState, action = {}) {
    // @TODO: check whether the record satisfy filter

    const { filter, list } = state;

    switch (action.type) {
        case RecordActionTypes.ADD_RECORD:
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
            console.log('update record');
            return state;

        case RecordActionTypes.RECEIVE_RECORDS:
            return {
                filter,
                list: action.data
            };

        default:
            return state;
    }
}

export default recordReducer;