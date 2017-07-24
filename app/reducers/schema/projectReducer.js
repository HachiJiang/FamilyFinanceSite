'use strict';

/**
 * Project categories reducer
 */

import * as ProjectActionTypes from '../../actiontypes/schema/project';
import { updateCategory } from './categoriesReducerUtils';

function projectCategoriesReducer(state = [], action = {}) {
    switch (action.type) {
        case ProjectActionTypes.ADD_CATEGORY:
            return updateCategory(state, action.cat);

        case ProjectActionTypes.DELETE_CATEGORY:

            return state;

        case ProjectActionTypes.UPDATE_CATEGORY:
            return state;

        case ProjectActionTypes.RECEIVE_CATEGORIES:
            return action.data;

        default:
            return state;
    }
}

export default projectCategoriesReducer;