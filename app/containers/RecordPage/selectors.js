/**
 * RecordPage selectors
 */

import * as EnumRecordType from '../../constants/EnumRecordType';

/**
 * Get schema
 * @param {Object} state
 * @returns {*}
 */
const getSchema = function(state) {
    return state.get('schema');
};

/**
 * Get record page data
 * @param {Object} state
 * @returns {*}
 */
const getRecordPageData = function(state) {
    return state.get('recordPage');
};

/**
 * Get outcome categories
 * @param {Object} state
 * @returns {*}
 */
const getCatOutcome = function(state) {
    const schema = getSchema(state);
    return schema.get('catOutcome');
};

/**
 * Get record list
 * @param {Object} state
 * @returns {*}
 */
const getRecordList = function(state) {
    return getRecordPageData(state).list;
};

/**
 * Get time range
 * @param {Object} state
 * @returns {{from: *, to: *}}
 */
const getRange = function(state) {
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
const getTotals = function(state) {
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

export {
    getCatOutcome,
    getRecordList,
    getRange,
    getTotals
};