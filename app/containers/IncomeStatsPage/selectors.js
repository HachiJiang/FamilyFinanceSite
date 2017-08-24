'use strict';

/*
 *
 * Selectors for summaryPage
 *
 */

import { getIncomeCategories, getMembers } from '../App/selectors';
import { parseAmountBySubcat, getAmountByCat, parseAmountByMembers, groupItems } from '../../utils/aggregationUtils';
import { DECIMAL_PRECISION } from '../../constants/Config';

/**
 * Get amountByDate
 * @param {Array} raw
 * @returns {Object}
 */
const parseAmountByDate = (raw = []) => {
    let result = {};

    _.forEach(raw, ({ _id, value }) => {
        const year = _id.year;
        result[year] = {
            name: year,
            value: _.toNumber(value.toFixed(DECIMAL_PRECISION))
        }
    });

    return result;
};

/**
 * Parse amountByDateAndMember
 * @param {Object} raw
 * @returns {Array}
 */
const parseAmountByDateAndMember = raw => {
    let min = Infinity;
    let max = -Infinity;

    let result = [];
    _.map(raw, (items, key) => {
        const newItems = parseAmountByDate(items);

        // find range
        _.forEach(newItems, (item, key) => {
            max = Math.max(key, max);
            min = Math.min(key, min);
        });

        result.push({
            name: key,
            items: newItems
        });
    });

    // fill year
    _.forEach(result, member => {
        let items = member.items;
        for (let i = min; i <= max; i++) {
            if (!items[i]) {
                items[i] = {
                    name: i,
                    value: 0
                };
            }
        }
        member.items = _.toArray(_.sortBy(items));
    });

    return result;
};

/**
 * Parse amountByCatAndMember
 * @param {Object} raw
 * @param {Array} categories
 */
const parseAmountByCatAndMember = (raw, categories) => _.map(raw, (items, key) => {
    const subCatItems = parseAmountBySubcat(items, categories);
    return {
        name: key,
        subCats: subCatItems,
        cats: getAmountByCat(subCatItems)
    }
});

/**
 * Get
 * @param state
 */
const getData = state => {
    const data = state.get('incomeStatsPage');
    const { year, amountByDate, amountByMember, amountByCat, amountByDateAndMember, amountByCatAndMember } = data;
    const categories = getIncomeCategories(state);
    const amountBySubcat = parseAmountBySubcat(amountByCat, categories);
    const members = getMembers(state);

    return {
        year,
        amountByDate: parseAmountByDate(amountByDate),
        amountByCat: getAmountByCat(amountBySubcat),
        amountBySubcat: amountBySubcat,
        amountByMember: parseAmountByMembers(amountByMember, members),
        amountByDateAndMember: parseAmountByDateAndMember(groupItems(amountByDateAndMember, 'member', true, members)),
        amountByCatAndMember: parseAmountByCatAndMember(groupItems(amountByCatAndMember, 'member', true, members), categories)
    };
};

export {
    getData
}