'use strict';

/*
 *
 * Account reducer
 *
 */

import * as AccountActionTypes from '../../actiontypes/schema/account';
import { updateCategory } from './categoriesReducerUtils';

function accountReducer(state = [], action = {}) {
    switch (action.type) {
        case AccountActionTypes.ADD_CATEGORY:
            return updateCategory(state, action.cat);

        case AccountActionTypes.DELETE_CATEGORY:

            return state;

        case AccountActionTypes.UPDATE_CATEGORY:
            return state;

        case AccountActionTypes.RECEIVE_CATEGORIES:  // fetch data from server
            return action.data;

        default:
            return state;
    }
}

export default accountReducer;