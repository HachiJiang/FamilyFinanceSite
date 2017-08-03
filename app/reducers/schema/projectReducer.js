'use strict';

/**
 * Project categories reducer
 */

import * as ProjectActionTypes from '../../actiontypes/schema/project';
import * as categoriesReducerUtils from './categoriesReducerUtils';

function projectCategoriesReducer(state = [], action = {}) {
    switch (action.type) {
        case ProjectActionTypes.ADD_CATEGORY:
        case ProjectActionTypes.UPDATE_CATEGORY:
            return categoriesReducerUtils.updateCategory(state, action.cat);

        case ProjectActionTypes.DELETE_CATEGORY:
            return categoriesReducerUtils.deleteCategory(state, action.cat, action.itemId);

        case ProjectActionTypes.RECEIVE_CATEGORIES:
            return action.data;

        default:
            return state;
    }
}

export default projectCategoriesReducer;