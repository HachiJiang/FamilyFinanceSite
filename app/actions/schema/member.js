'use strict';

/*
 *
 * Actions for member
 *
 */

import * as API from '../../constants/API';
import * as MemberActionTypes from '../../actiontypes/schema/member';
import request from './../base/request.js';

/**
 * Add member with name
 * @param {string} name
 * @returns {{type: ADD_MEMBER, item: Object}}
 */
export const addMember = name => request.post(API.MEMBER_CREATE, { name }, item => {
    return {
        type: MemberActionTypes.ADD_MEMBER,
        item
    }
});

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

/**
 * Receive members
 * @param json
 * @returns {{type: RECEIVE_MEMBERS, data: *}}
 */
function receiveMembers(json) {
    return {
        type: MemberActionTypes.RECEIVE_MEMBERS,
        data: json
    };
}

/**
 * Fetch members from server
 * @returns {Function}
 */
export const fetchMembers = () => request.get(API.MEMBER_GET, receiveMembers);