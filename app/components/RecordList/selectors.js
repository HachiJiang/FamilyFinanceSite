'use strict';

/**
 * RecordList selectors
 */
import _ from 'lodash';
import * as EnumRecordType from '../../constants/EnumRecordType';

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