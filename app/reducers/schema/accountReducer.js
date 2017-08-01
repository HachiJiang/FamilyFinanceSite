'use strict';

/*
 *
 * Account reducer
 *
 */

import * as AccountActionTypes from '../../actiontypes/schema/account';
import * as categoriesReducerUtils from './categoriesReducerUtils';

function accountReducer(state = [], action = {}) {
    switch (action.type) {
        case AccountActionTypes.ADD_CATEGORY:
        case AccountActionTypes.UPDATE_CATEGORY:
            return categoriesReducerUtils.updateCategory(state, action.cat);

        case AccountActionTypes.DELETE_CATEGORY:
            return categoriesReducerUtils.deleteCategory(state, action.cat, action.itemId);

        case AccountActionTypes.RECEIVE_CATEGORIES:  // fetch data from server
            return action.data;

        default:
            return state;
    }
}

export default accountReducer;