'use strict';

/*
 *
 * Selectors for aggregation data
 *
 */

import _ from 'lodash';
import { DECIMAL_PRECISION } from '../constants/Config';
import { idStrToNames, idStrToName } from './recordUtils';

/**
 * Get amountBySubcat
 * @param {Array} raw
 * @param {Array} categories
 * @returns {Array}
 */
const parseAmountBySubcat = (raw = [], categories = []) =>
    categories.length > 0 ?  _.map(raw, item => {
        const { value } = item;
        const names = idStrToNames(item._id.category, categories);
        if (!_.isArray(names) || names.length < 1) {
            return;
        }

        return {
            cat: names[1],
            name: names[0],
            value
        };
    }) : [];

/**
 * Get amountByCat
 * @param {Array} amountBySubcat
 * @returns {Array}
 */
const getAmountByCat = (amountBySubcat = []) => {
    let result = {};
    _.forEach(amountBySubcat, item => {
        const { cat, value } = item;
        if (!result[cat]) {
            result[cat] = {
                name: cat,
                value
            };
        } else {
            result[cat].value += value;
        }
    });

    return _.map(result, ({ name, value }) => ({
        name,
        value: _.toNumber(value.toFixed(DECIMAL_PRECISION))
    }));
};

/**
 * Parse amountByMembers
 * @param {Array} raw
 * @param {Array} members
 * @returns {Array}
 */
const parseAmountByMembers = (raw, members = []) =>
    members.length > 0 ? _.map(raw, item => ({
        name: idStrToName(item._id.member, members),
        value: item.value
    })) : [];

/**
 * Group items by specific groupBy prop
 * @param {Array} raw
 * @param {boolean} needParse
 * @param {String} groupBy
 * @param {Array} categories: to parse groupBy
 * @returns {{}}
 */
const groupItems = (raw = [], groupBy = '', needParse = false, categories = []) => {
    if (raw.length < 1 || !groupBy || categories.length < 1) {
        return {};
    }

    let result = {};

    _.forEach(raw, item => {
        const id = item._id[groupBy];
        if (!result[id]) {
            result[id] = {
                name: needParse ? idStrToName(id, categories) : id,
                items: [item]
            };
        } else {
            result[id].items.push(item);
        }
    });

    return result;
};

export {
    parseAmountBySubcat,
    getAmountByCat,
    parseAmountByMembers,
    groupItems
}