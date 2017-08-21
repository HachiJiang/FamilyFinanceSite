'use strict';

/*
 *
 * Configuration constants
 *
 */

import moment from 'moment';

moment.locale('zh-cn');

export const ID_SEPARATOR = ',';
export const CONSUME_DATE_FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'YYYY-MM';
export const DECIMAL_PRECISION = 2;
export const TimeZoneOffset = (new Date()).getTimezoneOffset();