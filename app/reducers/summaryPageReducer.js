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
    const { outcome } = state;

    switch (action.type) {
        case SummaryPageActionTypes.CHANGE_MONTH:
            return {
                ...state,
                outcome: {
                    ...outcome,
                    dateStr: action.dateStr
                }
            };

        case SummaryPageActionTypes.OUTCOME_BY_DAY_RECEIVED:
            return {
                ...state,
                outcome: {
                    ...outcome,
                    dateStr: action.dateStr,
                    amountByDay: action.amountByDay
                }
            };

        case SummaryPageActionTypes.OUTCOME_BY_CAT_RECEIVED:
            return {
                ...state,
                outcome: {
                    ...outcome,
                    dateStr: action.dateStr,
                    amountByCat: action.amountByCat
                }
            };

        default:
            return state;
    }
}

export default summaryPageReducer;