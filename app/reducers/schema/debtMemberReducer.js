/*
 *
 * Debt member reducer
 *
 */

import _ from 'lodash';
import * as MemberActionTypes from '../../actiontypes/member';

const initialState = [
    {
        name: '债权人1'
    }, {
        name: '债权人2'
    }
];

function debMemberReducer(state = initialState, action = {}) {
    switch (action.type) {
        case MemberActionTypes.ADD_MEMBER_DEBT:
            return [
                ...state,
                {
                    name: action.name
                }
            ];
        case MemberActionTypes.DELETE_MEMBER_DEBT:
            return state;

        case MemberActionTypes.UPDATE_MEMBER_DEBT:
            return state;

        default:
            return state;
    }
}

export default debMemberReducer;