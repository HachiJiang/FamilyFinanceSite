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
export const addMember = name => request.post(API.MEMBER_CREATE, { name }, item => ({
    type: MemberActionTypes.ADD_MEMBER,
    item
}));

/**
 * Delete member with _id
 * @param {string} memberId
 * @returns {{type: DELETE_MEMBER, _id: string}}
 */
export const deleteMember = memberId => request.del(API.MEMBER_DELETE({ memberId }), ({ _id }) => ({
    type: MemberActionTypes.DELETE_MEMBER,
    _id
}));

/**
 * Update member with name in specific position
 * @param {string} name
 * @param {string} memberId
 * @returns {{type: UPDATE_MEMBER, item: Object}}
 */
export const updateMember = (name, memberId) => request.update(API.MEMBER_UPDATE({ memberId, }), { name }, item => ({
    type: MemberActionTypes.UPDATE_MEMBER,
    item
}));

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
export const fetchMembers = dispatch => dispatch(request.get(API.MEMBER_GET, receiveMembers));