/*
 *
 * Outcome category reducer
 *
 */

import _ from 'lodash';
import * as CategoryActionTypes from '../../actiontypes/category';
import { addCategory } from './categoriesReducerUtils';

import outcomeCategories from '../../data/outcomeCategories';

const initialState = outcomeCategories || [];

function catOutcomeReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CategoryActionTypes.OUTCOME_ADD_CATEGORY:
            return addCategory(state, action);
        case CategoryActionTypes.OUTCOME_DELETE_CATEGORY:

            return state;

        case CategoryActionTypes.UPDATE_CATEGORY_OUTCOME:
            return state;

        case CategoryActionTypes.OUTCOME_RECEIVE_CATEGORIES:  // fetch data from server
            return action.cats;

        default:
            return state;
    }
}

export default catOutcomeReducer;