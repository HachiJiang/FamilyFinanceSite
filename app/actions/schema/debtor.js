'use strict';

/*
 *
 * Actions for debt member
 *
 */

import * as API from '../../constants/API';
import * as DebtorActionTypes from '../../actiontypes/schema/debtor';
import request from './../base/request.js';

/**
 * Add member with name
 * @param {string} name
 * @returns {{type: ADD_DEBTOR, item: Object}}
 */
export const addMember = name => request.post(API.DEBTOR_CREATE, { name }, item => {
    return {
        type: DebtorActionTypes.ADD_DEBTOR,
        item
    }
});

/**
 * Delete member in specific position
 * @param {number} index
 * @returns {{type: DELETE_DEBTOR, Array: *}}
 */
export const deleteMember = index => {
    return {
        type: DebtorActionTypes.DELETE_DEBTOR,
        index
    };
};

/**
 * Update member with name in specific position
 * @param {string} name
 * @param {number} index
 * @returns {{type: UPDATE_DEBTOR, index: *, name: *}}
 */
export const updateMember = (name, index) => {
    return {
        type: DebtorActionTypes.UPDATE_DEBTOR,
        name,
        index
    };
};

/**
 * Receive debtors
 * @param data
 * @returns {{type: RECEIVE_DEBTORS, data: *}}
 */
function receiveDebtors(data) {
    return {
        type: DebtorActionTypes.RECEIVE_DEBTORS,
        data
    };
}

/**
 * Fetch debtors from server
 * @returns {Function}
 */
export const fetchDebtors = () => request.get(API.DEBTOR_GET, receiveDebtors);