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
    total: {
        dateMode: 'year',
        incomeByDate: [],
        outcomeByDate: []
    },
    outcome: {
        dateStr: moment().format(MONTH_FORMAT),
        amountByDay: [],
        amountByCat: [],
        amountByMember: []
    }
};

function summaryPageReducer(state = initialState, action = {}) {
    const { outcome, total } = state;

    switch (action.type) {
        case SummaryPageActionTypes.CHANGE_TOTAL_DATE_MODE:
            return {
                ...state,
                total: {
                    ...total,
                    dateMode: action.dateMode
                }
            };

        case SummaryPageActionTypes.TOTAL_OUTCOME_BY_DATE_RECEIVED:
            return {
                ...state,
                total: {
                    ...total,
                    outcomeByDate: action.outcomeByDate
                }
            };

        case SummaryPageActionTypes.TOTAL_INCOME_BY_DATE_RECEIVED:
            return {
                ...state,
                total: {
                    ...total,
                    incomeByDate: action.incomeByDate
                }
            };

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