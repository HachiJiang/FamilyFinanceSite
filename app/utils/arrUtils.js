'use strict';

import _ from 'lodash';

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
        result.push(_.toNumber((sum / (index + 1)).toFixed(2)))
        console.log(result);
    });

    return result;
};

export {
    getMovingAvg
}