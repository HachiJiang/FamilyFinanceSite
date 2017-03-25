/**
 * RecordEditor selectors
 */

/**
 * Get record list
 * @param state
 * @returns {*}
 */
const getRecordList = function(state) {
    return state.get('recordPage').list;
};

/**
 * Get time range
 * @param {Object} state
 * @returns {{from: *, to: *}}
 */
const getRange = function(state) {
    const filter = state.get('recordPage').filter;
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
    const list = state.get('recordPage').list;
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
    getRecordList,
    getRange,
    getTotals
};