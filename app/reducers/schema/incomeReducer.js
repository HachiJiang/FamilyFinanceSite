/*
 *
 * Income category reducer
 *
 */

import _ from 'lodash';
import * as IncomeActionTypes from '../../actiontypes/schema/income';
import { addCategory } from './categoriesReducerUtils';

function incomeCategoriesReducer(state = [], action = {}) {
    switch (action.type) {
        case IncomeActionTypes.ADD_CATEGORY:
            return addCategory(state, action);
        case IncomeActionTypes.DELETE_CATEGORY:

            return state;

        case IncomeActionTypes.UPDATE_CATEGORY:
            return state;

        case IncomeActionTypes.RECEIVE_CATEGORIES:
            return action.data;

        default:
            return state;
    }
}

export default incomeCategoriesReducer;