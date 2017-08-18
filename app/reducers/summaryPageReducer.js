'use strict';

/*
 *
 * SummaryPage reducer
 *
 */
import moment from 'moment';
import * as SummaryPageActionTypes from '../actiontypes/summaryPage';

const initialState = {
    outcome: {
        year: moment().year(),  // current month by default
        month: moment().month(),
        amountByDay: [],
        amountByCat: []
    }
};

const updateOutcome = (oldState, data) => {
    if (!data) {
        return oldState;
    }

    const { outcome } = oldState;
    return {
        ...oldState,
        outcome: {
            ...outcome,
            amountByDay: data
        }
    };
};

function summaryPageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SummaryPageActionTypes.OUTCOME_CHANGE_MONTH:

            return state;

        case SummaryPageActionTypes.OUTCOME_BY_DAY_RECEIVED:
            return updateOutcome(state, action.data);

        case SummaryPageActionTypes.OUTCOME_BY_CAT_RECEIVED:
            return state;

        default:
            return state;
    }
}

export default summaryPageReducer;