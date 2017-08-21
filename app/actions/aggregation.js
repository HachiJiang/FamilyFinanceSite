'use strict';

/*
 *
 * Actions for aggregations
 *
 */

import { AGGREGATION_BY_RANGE, AGGREGATION_ALL } from '../constants/API';
import request from './base/request';
import { invalidParamFailure } from '../utils/messageUtils';

/**
 * Fetch aggregation amount
 * @param {String} type: record type
 * @param {String} groupId: amount will be grouped by this id
 * @param {Function} callback
 * @param {String} fDate
 * @param {String} tDate
 */
const fetchAggregationAmount = (type, groupId, callback, fDate, tDate) => {
    if (type && groupId && callback) {
        const params = (fDate && tDate) ?
            AGGREGATION_BY_RANGE({
                sumBy: 'amount',
                type,
                groupId,
                fDate: fDate.toISOString(),
                tDate:tDate.toISOString()
            })
            :
            AGGREGATION_ALL({
                sumBy: 'amount',
                type,
                groupId
            });

        return request.get(params, callback);
    } else {
        invalidParamFailure();
    }
};

export {
    fetchAggregationAmount
}