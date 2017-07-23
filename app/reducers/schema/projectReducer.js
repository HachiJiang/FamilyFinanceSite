'use strict';

/**
 * Project categories reducer
 */

import _ from 'lodash';
import * as ProjectActionTypes from '../../actiontypes/schema/project';
import { addCategory } from './categoriesReducerUtils';

function projectCategoriesReducer(state = [], action = {}) {
    switch (action.type) {
        case ProjectActionTypes.ADD_CATEGORY:
            return addCategory(state, action);
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