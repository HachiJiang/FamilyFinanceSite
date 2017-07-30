'use strict';

// makeSelectLocationState expects a plain JS object for the routing state
export const makeSelectLocationState = () => {
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
 * @returns {*}
 */
const getSchema = state => state.get('schema');

/**
 * Get outcome categories
 * @param {Object} state
 * @returns {*}
 */
export const getOutcomeCategories = state => getSchema(state).get('outcomeCategories');

/**
 * Get income categories
 * @param {Object} state
 * @returns {*}
 */
export const getIncomeCategories = state => getSchema(state).get('incomeCategories');

/**
 * Get account categories
 * @param {Object} state
 * @returns {*}
 */
export const getAccountCategories = state => getSchema(state).get('accountCategories');

/**
 * Get project categories
 * @param {Object} state
 * @returns {*}
 */
export const getProjectCategories = state => getSchema(state).get('projectCategories');

/**
 * Get members
 * @param {Object} state
 * @returns {*}
 */
export const getMembers = state => getSchema(state).get('members');

/**
 * Get debtors
 * @param {Object} state
 * @returns {*}
 */
export const getDebtors = state => getSchema(state).get('debtors');
