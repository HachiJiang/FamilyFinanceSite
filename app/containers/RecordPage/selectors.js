/**
 * RecordPage selectors
 */

import * as EnumRecordType from '../../constants/EnumRecordType';

/**
 * Get schema
 * @param {Object} state
 * @returns {*}
 */
const getSchema = state => state.get('schema');

/**
 * Get record page data
 * @param {Object} state
 * @returns {*}
 */
const getRecordPageData = state => state.get('recordPage');

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
 * Get debt members
 * @param {Object} state
 * @returns {*}
 */
export const getDebtMembers = state => getSchema(state).get('debtMembers');

/**
 * Get record list
 * @param {Object} state
 * @returns {*}
 */
export const getRecordList = state => getRecordPageData(state).list;

/**
 * Get time range
 * @param {Object} state
 * @returns {{from: *, to: *}}
 */
export const getRange = state => {
    const filter = getRecordPageData(state).filter;
    return {
        from: filter.from,
        to: filter.to
    };
};

/**
 * Get total values
 * @param {Object} state
 * @returns {{income: number, outcome: (number|*)}}
 */
export const getTotals = state => {
    const list = getRecordList(state);
    let totalIncome = 0;
    let totalOutcome = 0;

    list.forEach(function(record) {
        if (record) {
            if (record.type === EnumRecordType.INCOME) {
                totalIncome += record.amount;
            } else if (record.type === EnumRecordType.OUTCOME) {
                totalOutcome += record.amount;
            }
        }
    });

    return {
        income: totalIncome,
        outcome: totalOutcome
    };
};