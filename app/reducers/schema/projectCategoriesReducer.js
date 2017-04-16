/*
 *
 * Project categories reducer
 *
 */

import _ from 'lodash';
import * as CategoryActionTypes from '../../actiontypes/category';
import { addCategory } from './categoriesReducerUtils';

import projectCategories from '../../data/projectCategories';

const initialState = projectCategories || [];

function projectCategoriesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY_PROJECT:
            return addCategory(state, action);
        case CategoryActionTypes.DELETE_CATEGORY_PROJECT:

            return state;

        case CategoryActionTypes.UPDATE_CATEGORY_PROJECT:
            return state;

        default:
            return state;
    }
}

export default projectCategoriesReducer;