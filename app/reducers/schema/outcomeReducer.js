/*
 *
 * Outcome category reducer
 *
 */

import _ from 'lodash';
import * as OutcomeActionTypes from '../../actiontypes/schema/outcome';
import { addCategory } from './categoriesReducerUtils';

function catOutcomeReducer(state = [], action = {}) {
    switch (action.type) {
        case OutcomeActionTypes.ADD_CATEGORY:
            return addCategory(state, action);
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