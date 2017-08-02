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
 * Add debtor with name
 * @param {string} name
 * @returns {{type: ADD_DEBTOR, item: Object}}
 */
export const addDebtor = name => request.post(API.DEBTOR_CREATE, { name }, item => ({
    type: DebtorActionTypes.ADD_DEBTOR,
    item
}));

/**
 * Delete debtor in specific position
 * @param {number} index
 * @returns {{type: DELETE_DEBTOR, Array: *}}
 */
export const deleteDebtor = index => ({
    type: DebtorActionTypes.DELETE_DEBTOR,
    index
});

/**
 * Update debtor with name in specific position
 * @param {string} name
 * @param {number} index
 * @returns {{type: UPDATE_DEBTOR, index: *, name: *}}
 */
export const updateDebtor = (name, index) => ({
    type: DebtorActionTypes.UPDATE_DEBTOR,
    name,
    index
});

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
export const fetchDebtors = dispatch => dispatch(request.get(API.DEBTOR_GET, receiveDebtors));