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
        amountByCat: [],
        amountByMember: []
    }
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
                    amountByDay: action.amountByDay
                }
            };

        case SummaryPageActionTypes.OUTCOME_BY_CAT_RECEIVED:
            return {
                ...state,
                outcome: {
                    ...outcome,
                    amountByCat: action.amountByCat
                }
            };


        case SummaryPageActionTypes.OUTCOME_BY_MEMBER_RECEIVED:
            return {
                ...state,
                outcome: {
                    ...outcome,
                    amountByMember: action.amountByMember
                }
            };

        default:
            return state;
    }
}

export default summaryPageReducer;