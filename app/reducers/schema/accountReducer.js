'use strict';

/*
 *
 * Account reducer
 *
 */

import _ from 'lodash';
import * as AccountActionTypes from '../../actiontypes/schema/account';
import { addCategory } from './categoriesReducerUtils';

function accountReducer(state = [], action = {}) {
    switch (action.type) {
        case AccountActionTypes.ADD_CATEGORY:
            return addCategory(state, action);

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