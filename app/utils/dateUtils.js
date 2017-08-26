'use strict';

import moment from 'moment';
import { CONSUME_DATE_FORMAT, MONTH_FORMAT } from '../constants/Config';

/**
 * Get first and last day of month
 * @param {String} year
 * @param {String} month
 * @returns {{firstDay: Date, lastDay: Date}}
 */
const getFirstLastDayOfMonth = (year, month) => {
    if (!year || !month) {
        return;
    }

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    return {
        firstDay,
        lastDay
    };
};

/**
 * Get date range of specific month
 * @param {Object} momentDate: moment date
 * @returns {{fDate, tDate}}
 */
const getDateRangeOfMonth = (momentDate = moment()) => {
    const year = momentDate.year();
    const month = momentDate.month();
    const range = getFirstLastDayOfMonth(year, month);

    if (range) {
        return {
            fDate: moment(range.firstDay, CONSUME_DATE_FORMAT),
            tDate: moment(range.lastDay, CONSUME_DATE_FORMAT)
        };
    }
};

/**
 * Get current month
 * @returns {number}
 */
const getCurrentMonth = () => moment().format(MONTH_FORMAT);

/**
 * Get date range of current month
 * @returns {{fDate: string, tDate: string}}
 */
const getDateRangeOfCurrentMonth = () => getDateRangeOfMonth(moment());

export {
    getFirstLastDayOfMonth,
    getDateRangeOfMonth,
    getDateRangeOfCurrentMonth,
    getCurrentMonth
}