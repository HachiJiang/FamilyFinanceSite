/**
 * RecordList selectors
 */

import moment from 'moment';
import * as EnumRecordType from '../../constants/EnumRecordType';

/**
 * Get record list sorted by date
 * @param {Array} list
 * @returns {Array}
 */
export const getRecordListSortedByDate = list => list.sort((a, b) => {
    return moment(a.date).isBefore(moment(b.date));
});

/**
 * Get total values
 * @param {Array} list
 * @returns {{income: number, outcome: (number|*)}}
 */
export const getTotals = list => {
    let income = 0;
    let outcome = 0;
    let debt = 0;
    let loan = 0;

    list.forEach(function(record) {
        if (record) {
            switch (record.type) {
                case EnumRecordType.INCOME:
                    income += _.parseInt(record.amount);
                    break;
                case EnumRecordType.OUTCOME:
                    outcome -= _.parseInt(record.amount);
                    break;
                case EnumRecordType.BORROW:
                    debt += _.parseInt(record.amount);
                    break;
                case EnumRecordType.REPAY:
                    debt -= _.parseInt(record.amount);
                    break;
                case EnumRecordType.LEND:
                    loan += _.parseInt(record.amount);
                    break;
                case EnumRecordType.COLLECT_DEBT:
                    loan -= _.parseInt(record.amount);
                    break;
                default:
                    break;
            }
        }
    });

    return {
        income,
        outcome,
        debt,
        loan
    };
};