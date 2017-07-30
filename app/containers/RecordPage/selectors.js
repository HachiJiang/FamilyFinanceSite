'use strict';

/**
 * RecordPage selectors
 */

/**
 * Get record page data
 * @param {Object} state
 * @returns {*}
 */
const getRecordPageData = state => state.get('recordPage');

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