'use strict';

/*
 *
 * Income category reducer
 *
 */

import * as IncomeActionTypes from '../../actiontypes/schema/income';
import * as categoriesReducerUtils from './categoriesReducerUtils';

function incomeCategoriesReducer(state = [], action = {}) {
    switch (action.type) {
        case IncomeActionTypes.ADD_CATEGORY:
        case IncomeActionTypes.UPDATE_CATEGORY:
            return categoriesReducerUtils.updateCategory(state, action.cat);

        case IncomeActionTypes.DELETE_CATEGORY:
            return categoriesReducerUtils.deleteCategory(state, action.cat, action.itemId);

        case IncomeActionTypes.UPDATE_CATEGORY:
            return state;

        case IncomeActionTypes.RECEIVE_CATEGORIES:
            return action.data;

        default:
            return state;
    }
}

export default incomeCategoriesReducer;