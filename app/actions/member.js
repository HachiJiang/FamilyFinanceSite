/*
 *
 * Actions for member
 *
 */

import * as MemberActionTypes from '../actiontypes/member';

/**
 * Add member with name
 * @param {string} name
 * @returns {{type: ADD_MEMBER, name: *, index: *}}
 */
export const addMember = name => {
    return {
        type: MemberActionTypes.ADD_MEMBER,
        name
    };
};

/**
 * Delete member in specific position
 * @param {number} index
 * @returns {{type: DELETE_MEMBER, Array: *}}
 */
export const deleteMember = index => {
    return {
        type: MemberActionTypes.DELETE_MEMBER,
        index
    };
};

/**
 * Update member with name in specific position
 * @param {string} name
 * @param {number} index
 * @returns {{type: UPDATE_MEMBER, index: *, name: *}}
 */
export const updateMember = (name, index) => {
    return {
        type: MemberActionTypes.UPDATE_MEMBER,
        name,
        index
    };
};