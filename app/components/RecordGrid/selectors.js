'use strict';

import _ from 'lodash';
import moment from 'moment';
import { CONSUME_DATE_FORMAT } from '../../constants/Config';
import * as EnumRecordType from '../../constants/EnumRecordType';
import { getRecordTypeName } from '../../utils/recordUtils';

const sorterByDate = (a, b) => {
    const format = 'YYYYMMDD';
    const aConsumeDate = _.toNumber(moment(a.consumeDate).format(format));
    const bConsumeDate = _.toNumber(moment(b.consumeDate).format(format));
    const aCreatedAt = _.toNumber(moment(a.createdAt).format(format));
    const bCreatedAt = _.toNumber(moment(b.createdAt).format(format));

    if (aConsumeDate === bConsumeDate) {
        return (aCreatedAt < bCreatedAt ? 1 : -1);
    }
    return aConsumeDate < bConsumeDate ? 1 : -1;
};

/**
 * Get record list sorted by consumeDate
 * @param {Array} list
 * @returns {Array}
 */
const getRecordListSortedByDate = list => list.sort(sorterByDate);

const getDataRows = records => getRecordListSortedByDate(records).map(record => ({
    record,
    ...record,
    key: record._id,
    text: getRecordTypeName(record.type),
    date: moment(record.consumeDate).format(CONSUME_DATE_FORMAT + ' dddd')
}));

/**
 * Get filters for record types
 * @returns {Array}
 */
const getRecordTypeFilters = () => Object.values(EnumRecordType).map(type => ({
    value: type,
    text: getRecordTypeName(type)
}));

/**
 * Get filters for one-level items
 * @param {Array} items
 */
const getItemFilters = items => items.map(({ name }) => ({
    value: name,
    text: name
}));

/**
 * Get filters for categories
 * @param {Array} categories
 * @returns {Array}
 */
const getCategoryFilters = categories => {
    let filters = [];

    _.forEach(categories, cat => {
        const items = cat && cat.items;
        if (!items) {
            return;
        }

        _.forEach(items, ({ name }) => {
            filters.push({
                value: name,
                text: name
            });
        });
    });

    return filters;
};

export {
    sorterByDate,
    getDataRows,
    getRecordTypeFilters,
    getItemFilters,
    getCategoryFilters
}