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
    dateMode: 'year',
    incomeByDate: [],
    outcomeByDate: []
};

function summaryPageReducer(state = initialState, action = {}) {
    const { outcome } = state;

    switch (action.type) {
        case SummaryPageActionTypes.CHANGE_TOTAL_DATE_MODE:
            return {
                ...state,
                dateMode: action.dateMode
            };

        case SummaryPageActionTypes.TOTAL_OUTCOME_BY_DATE_RECEIVED:
            return {
                ...state,
                outcomeByDate: action.outcomeByDate
            };

        case SummaryPageActionTypes.TOTAL_INCOME_BY_DATE_RECEIVED:
            return {
                ...state,
                incomeByDate: action.incomeByDate
            };

        default:
            return state;
    }
}

export default summaryPageReducer;