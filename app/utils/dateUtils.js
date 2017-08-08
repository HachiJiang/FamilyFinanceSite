'use strict';

import moment from 'moment';
import { CONSUME_DATE_FORMAT } from '../constants/Config';

/**
 * Get date range of current month
 * @returns {{fDate: string, tDate: string}}
 */
export const getDateRangeOfCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    return {
        fDate: moment(firstDay).format(CONSUME_DATE_FORMAT),
        tDate: moment(lastDay).format(CONSUME_DATE_FORMAT)
    }
};