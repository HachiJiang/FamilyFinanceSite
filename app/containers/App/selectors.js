'use strict';

/*
 *
 * Selectors for App, the top selector
 *
 */

import { getAccountsWithBalance } from '../../utils/accountUtils';

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

/**
 * Get schema
 * @param {Object} state
 * @returns {Object}
 */
const getSchema = state => state.get('schema');

/**
 * Get outcome categories
 * @param {Object} state
 * @returns {Array}
 */
const getOutcomeCategories = state => getSchema(state).get('outcomeCategories');

/**
 * Get income categories
 * @param {Object} state
 * @returns {Array}
 */
const getIncomeCategories = state => getSchema(state).get('incomeCategories');

/**
 * Get account categories
 * @param {Object} state
 * @returns {Array}
 */
const getAccountCategories = state => {
    const rawList = getSchema(state).get('accountCategories');
    return getAccountsWithBalance(rawList); // add balance info
};

/**
 * Get project categories
 * @param {Object} state
 * @returns {Array}
 */
const getProjectCategories = state => getSchema(state).get('projectCategories');

/**
 * Get members
 * @param {Object} state
 * @returns {Array}
 */
const getMembers = state => getSchema(state).get('members');

/**
 * Get debtors
 * @param {Object} state
 * @returns {Array}
 */
const getDebtors = state => getSchema(state).get('debtors');

/**
 * Get schema objects
 * @param {Object} state
 */
const getSchemaObjects = state => {
    const schema = getSchema(state);
    return {
        incomeCategories: schema.get('incomeCategories'),
        outcomeCategories: schema.get('outcomeCategories'),
        accountCategories: schema.get('accountCategories'),
        projectCategories: schema.get('projectCategories'),
        members: schema.get('members'),
        debtors: schema.get('debtors')
    }
};

export {
    makeSelectLocationState,
    getOutcomeCategories,
    getIncomeCategories,
    getAccountCategories,
    getProjectCategories,
    getMembers,
    getDebtors,
    getSchemaObjects
}
