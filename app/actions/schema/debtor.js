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
 * @param {string} debtorId
 * @returns {{type: DELETE_DEBTOR, _id: string}}
 */
export const deleteDebtor = debtorId => request.del(API.DEBTOR_DELETE({ debtorId }), ({ _id }) => ({
    type: DebtorActionTypes.DELETE_DEBTOR,
    _id
}));

/**
 * Update debtor with name in specific position
 * @param {string} name
 * @param {string} debtorId
 * @returns {{type: UPDATE_MEMBER, item: Object}}
 */
export const updateDebtor = (name, debtorId) => request.update(API.DEBTOR_UPDATE({ debtorId }), { name }, item => ({
    type: DebtorActionTypes.UPDATE_DEBTOR,
    item
}));

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