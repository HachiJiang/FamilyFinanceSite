'use strict';

/*
 *
 * Actions for aggregations
 *
 */

import { AGGREGATION_BY_DATE } from '../constants/API';
import request from './base/request';
import { invalidParamFailure } from '../utils/messageUtils';

/**
 * Fetch aggregation amount
 * @param {String} type: record type
 * @param {String} groupId: amount will be grouped by this id
 * @param {String} fDate
 * @param {String} tDate
 * @param {Function} callback
 */
const fetchAggregationAmount = (type, groupId, fDate, tDate, callback) => {
    if (type && groupId && fDate && tDate && callback) {
        return request.get(AGGREGATION_BY_DATE({
            type,
            groupId,
            fDate: fDate.toISOString(),
            tDate:tDate.toISOString()
        }), callback);
    } else {
        invalidParamFailure();
    }
};

export {
    fetchAggregationAmount
}