'use strict';

/*
 *
 * Member reducer
 *
 */
import * as MemberActionTypes from '../../actiontypes/schema/member';
import * as categoriesReducerUtils from './categoriesReducerUtils';

function memberReducer(state = [], action = {}) {
    switch (action.type) {
        case MemberActionTypes.ADD_MEMBER:
            return [
                ...state,
                action.item
            ];

        case MemberActionTypes.DELETE_MEMBER:
            return categoriesReducerUtils.deleteCategory(state, { _id: action._id });

        case MemberActionTypes.UPDATE_MEMBER:
            return categoriesReducerUtils.updateCategory(state, action.item);

        case MemberActionTypes.RECEIVE_MEMBERS:
            return action.data;

        default:
            return state;
    }
}

export default memberReducer;