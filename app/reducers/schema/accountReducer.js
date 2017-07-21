/*
 *
 * Account reducer
 *
 */

import _ from 'lodash';
import * as CategoryActionTypes from '../../actiontypes/category';
import { addCategory } from './categoriesReducerUtils';

import accounts from '../../data/accounts';

const initialState = accounts || [];

function accountReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY_ACCOUNT:
            return addCategory(state, action);

        case CategoryActionTypes.DELETE_CATEGORY_ACCOUNT:

            return state;

        case CategoryActionTypes.UPDATE_CATEGORY_ACCOUNT:
            return state;

        case CategoryActionTypes.ACCOUNTS_RECEIVE_CATEGORIES:  // fetch data from server
            return action.cats;

        default:
            return state;
    }
}

export default accountReducer;