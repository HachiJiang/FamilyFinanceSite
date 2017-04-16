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
        case CategoryActionTypes.ADD_CATEGORY_OUTCOME:
            return addCategory(state, action);
        case CategoryActionTypes.DELETE_CATEGORY_OUTCOME:

            return state;

        case CategoryActionTypes.UPDATE_CATEGORY_OUTCOME:
            return state;

        default:
            return state;
    }
}

export default catOutcomeReducer;