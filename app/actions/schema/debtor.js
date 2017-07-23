'use strict';

/*
 *
 * Actions for debt member
 *
 */

import * as DebtorActionTypes from '../../actiontypes/schema/debtor';
import request from './../base/request.js';
import { DEBTOR_GET } from '../../constants/API';

/**
 * Add member with name
 * @param {string} name
 * @returns {{type: ADD_DEBTOR, name: *, index: *}}
 */
export const addMember = name => {
    return {
        type: DebtorActionTypes.ADD_DEBTOR,
        name
    };
};

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
 * @param json
 * @returns {{type: RECEIVE_DEBTORS, data: *}}
 */
function receiveDebtors(json) {
    return {
        type: DebtorActionTypes.RECEIVE_DEBTORS,
        data: json
    };
}

/**
 * Fetch debtors from server
 * @returns {Function}
 */
export const fetchDebtors = () => {
    return request(DEBTOR_GET, receiveDebtors);
};