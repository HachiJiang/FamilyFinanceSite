/*
 *
 * Actions for debt member
 *
 */

import * as MemberActionTypes from '../actiontypes/member';

/**
 * Add member with name
 * @param {string} name
 * @returns {{type: ADD_MEMBER_DEBT, name: *, index: *}}
 */
export const addMember = name => {
    return {
        type: MemberActionTypes.ADD_MEMBER_DEBT,
        name
    };
};

/**
 * Delete member in specific position
 * @param {number} index
 * @returns {{type: DELETE_MEMBER_DEBT, Array: *}}
 */
export const deleteMember = index => {
    return {
        type: MemberActionTypes.DELETE_MEMBER_DEBT,
        index
    };
};

/**
 * Update member with name in specific position
 * @param {string} name
 * @param {number} index
 * @returns {{type: UPDATE_MEMBER_DEBT, index: *, name: *}}
 */
export const updateMember = (name, index) => {
    return {
        type: MemberActionTypes.UPDATE_MEMBER_DEBT,
        name,
        index
    };
};