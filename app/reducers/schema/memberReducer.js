/*
 *
 * Member reducer
 *
 */

import _ from 'lodash';
import * as MemberActionTypes from '../../actiontypes/member';

import members from '../../data/members';

const initialState = members || [];

function memberReducer(state = initialState, action = {}) {
    switch (action.type) {
        case MemberActionTypes.ADD_MEMBER:
            return [
                ...state,
                {
                    name: action.name
                }
            ];
        case MemberActionTypes.DELETE_MEMBER:
            return state;

        case MemberActionTypes.UPDATE_MEMBER:
            return state;

        default:
            return state;
    }
}

export default memberReducer;