'use strict';

import moment from 'moment';
import { CONSUME_DATE_FORMAT, MONTH_FORMAT } from '../constants/Config';

/**
 * Get date range of specific month
 * @param {String} dateStr: YYYY-MM
 * @returns {{fDate: (*|moment.Moment), tDate: (*|moment.Moment)}}
 */
const getDateRange = dateStr => {
    if (!dateStr) {
        return;
    }

    const date = moment(dateStr, MONTH_FORMAT);
    const year = date.year();
    const month = date.month();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    return {
        fDate: moment(firstDay, CONSUME_DATE_FORMAT),
        tDate: moment(lastDay, CONSUME_DATE_FORMAT)
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
    return getDateRange(year, month);
};

export {
    getDateRange,
    getDateRangeOfCurrentMonth
}