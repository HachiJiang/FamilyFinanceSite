'use strict';

/*
 *
 * Outcome category reducer
 *
 */

import * as OutcomeActionTypes from '../../actiontypes/schema/outcome';
import * as categoriesReducerUtils from './categoriesReducerUtils';

function catOutcomeReducer(state = [], action = {}) {
    switch (action.type) {
        case OutcomeActionTypes.ADD_CATEGORY:
            return categoriesReducerUtils.updateCategory(state, action.cat);

        case OutcomeActionTypes.DELETE_CATEGORY:

            return state;

        case OutcomeActionTypes.UPDATE_CATEGORY:
            return state;

        case OutcomeActionTypes.RECEIVE_CATEGORIES:  // fetch data from server
            return action.data;

        default:
            return state;
    }
}

export default catOutcomeReducer;