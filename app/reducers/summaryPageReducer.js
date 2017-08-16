'use strict';

/*
 *
 * SummaryPage reducer
 *
 */

import * as SummaryPageActionTypes from '../actiontypes/summaryPage';

const initialState = {
    outcome: {
        year: '',  // current month by default
        month: '',
        amountByDay: [],
        amountByCat: []
    }
};

function summaryPageReducer(state = initialState, action = {}) {
    const { outcome } = state;

    switch (action.type) {
        case SummaryPageActionTypes.OUTCOME_CHANGE_MONTH:

            return state;

        case SummaryPageActionTypes.OUTCOME_BY_DAY_RECEIVED:
            return state;

        case SummaryPageActionTypes.OUTCOME_BY_CAT_RECEIVED:
            return state;

        default:
            return state;
    }
}

export default summaryPageReducer;