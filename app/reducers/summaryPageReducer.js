'use strict';

/*
 *
 * SummaryPage reducer
 *
 */
import * as SummaryPageActionTypes from '../actiontypes/summaryPage';

const initialState = {
    year: '',
    incomeByDate: [],
    outcomeByDate: []
};

function summaryPageReducer(state = initialState, action = {}) {

    switch (action.type) {
        case SummaryPageActionTypes.SELECT_YEAR:
            return {
                ...state,
                year: action.year
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