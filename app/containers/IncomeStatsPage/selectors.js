'use strict';

/*
 *
 * Selectors for summaryPage
 *
 */

import { getIncomeCategories, getMembers } from '../App/selectors';
import { parseAmountBySubcat, getAmountByCat, parseAmountByMembers, groupItems } from '../../utils/aggregationUtils';

/**
 * Get amountByDate
 * @param {Array} raw
 * @returns {Array}
 */
const parseAmountByDate = (raw = []) =>
    _.map(raw, item => {
        return {
            name: item._id.year,
            value: item.value
        };
    });

const parseAmountByDateAndMember = raw => _.map(raw, ({ name, items }) => ({
    name,
    items: parseAmountByDate(items)
}));

const parseAmountByCatAndMember = (raw, categories) => _.map(raw, ({ name, items }) => {
    const subCatItems = parseAmountBySubcat(items, categories);
    return {
        name,
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