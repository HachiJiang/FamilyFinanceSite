'use strict';

import _ from 'lodash';
import { DECIMAL_PRECISION } from '../constants/Config';

/**
 * Get moving average of array
 * @param {Array} arr
 * @returns {Array}
 */
const getMovingAvg = arr => {
    let result = [];
    let sum = 0;

    _.forEach(arr, (val, index) => {
        sum += val;
        result.push(_.toNumber((sum / (index + 1)).toFixed(DECIMAL_PRECISION)));
    });

    return result;
};

export {
    getMovingAvg
}