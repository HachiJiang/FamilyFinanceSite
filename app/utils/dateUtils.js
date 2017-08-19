'use strict';

import moment from 'moment';
import { CONSUME_DATE_FORMAT } from '../constants/Config';

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
 * @param {String} year
 * @param {String} month
 * @returns {{fDate, tDate}}
 */
const getDateRangeOfMonth = (year, month) => {
    const range = getFirstLastDayOfMonth(year, month);
    if (range) {
        return {
            fDate: moment(range.firstDay, CONSUME_DATE_FORMAT),
            tDate: moment(range.lastDay, CONSUME_DATE_FORMAT)
        };
    }
};

/**
 * Get date range of current month
 * @returns {{fDate: string, tDate: string}}
 */
const getDateRangeOfCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    return getDateRangeOfMonth(year, month);
};

export {
    getFirstLastDayOfMonth,
    getDateRangeOfMonth,
    getDateRangeOfCurrentMonth
}