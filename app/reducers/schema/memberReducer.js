'use strict';

/*
 *
 * Member reducer
 *
 */
import * as MemberActionTypes from '../../actiontypes/schema/member';

function memberReducer(state = [], action = {}) {
    switch (action.type) {
        case MemberActionTypes.ADD_MEMBER:
            return [
                ...state,
                action.item
            ];

        case MemberActionTypes.DELETE_MEMBER:
            return state;

        case MemberActionTypes.UPDATE_MEMBER:
            return state;

        case MemberActionTypes.RECEIVE_MEMBERS:
            return action.data;

        default:
            return state;
    }
}

export default memberReducer;