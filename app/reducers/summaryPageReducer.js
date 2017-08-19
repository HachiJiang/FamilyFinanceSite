'use strict';

/*
 *
 * SummaryPage reducer
 *
 */
import moment from 'moment';
import * as SummaryPageActionTypes from '../actiontypes/summaryPage';
import { MONTH_FORMAT } from '../constants/Config';

const initialState = {
    outcome: {
        dateStr: moment().format(MONTH_FORMAT),
        amountByDay: [],
        amountByCat: []
    }
};

const updateOutcome = (oldState, amountByDay, dateStr) => {
    if (!amountByDay) {
        return oldState;
    }

    return {
        ...oldState,
        outcome: {
            dateStr,
            amountByDay,
            amountByCat: oldState.outcome.amountByCat
        }
    };
};

function summaryPageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SummaryPageActionTypes.OUTCOME_CHANGE_MONTH:

            return state;

        case SummaryPageActionTypes.OUTCOME_BY_DAY_RECEIVED:
            return updateOutcome(state, action.amountByDay, action.dateStr);

        case SummaryPageActionTypes.OUTCOME_BY_CAT_RECEIVED:
            return state;

        default:
            return state;
    }
}

export default summaryPageReducer;