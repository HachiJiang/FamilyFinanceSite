/*
 *
 * Income category reducer
 *
 */

import _ from 'lodash';
import * as CategoryActionTypes from '../../actiontypes/category';
import { addCategory } from './categoriesReducerUtils';

import incomeCategories from '../../data/incomeCategories';

const initialState = incomeCategories || [];

function incomeCategoriesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY_INCOME:
            return addCategory(state, action);
        case CategoryActionTypes.DELETE_CATEGORY_INCOME:

            return state;

        case CategoryActionTypes.UPDATE_CATEGORY_INCOME:
            return state;

        default:
            return state;
    }
}

export default incomeCategoriesReducer;