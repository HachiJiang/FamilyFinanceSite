'use strict';

/*
 *
 * Reducer of IncomeStatsPage
 *
 */

import * as IncomeStatsPageActionTypes from '../actiontypes/incomeStatsPage';

const initialState = {
    year: 2017,  // @TODO: remove hardcode
    amountByCat: [],
    amountByMember: [],
    amountByDate: []
};

function incomeStatsReducer(state = initialState, action = {}) {

    switch (action.type) {
        case IncomeStatsPageActionTypes.CHANGE_YEAR:
            return {
                ...state,
                year: action.year
            };
            break;

        case IncomeStatsPageActionTypes.AMOUNT_BY_DATE_RECEIVED:
            return {
                ...state,
                amountByDate: action.amountByDate
            };
            break;

        case IncomeStatsPageActionTypes.AMOUNT_BY_MEMBER_RECEIVED:
            return {
                ...state,
                amountByMember: action.amountByMember
            };
            break;

        case IncomeStatsPageActionTypes.AMOUNT_BY_CAT_RECEIVED:
            return {
                ...state,
                amountByCat: action.amountByCat
            };
            break;

        default:
            return state;
    }
}

export default incomeStatsReducer;