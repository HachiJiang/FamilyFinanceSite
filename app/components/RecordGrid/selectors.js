'use strict';

import _ from 'lodash';
import moment from 'moment';
import { CONSUME_DATE_FORMAT } from '../../constants/Config';
import * as EnumRecordType from '../../constants/EnumRecordType';
import { getRecordTypeName } from '../../utils/recordUtils';

export const getDataRows = records => getRecordListSortedByDate(records).map((record, index) => ({
    record,
    ...record,
    key: index.toString(),
    text: getRecordTypeName(record.type),
    date: moment(record.consumeDate).format(CONSUME_DATE_FORMAT)
}));

/**
 * Get filters for record types
 * @returns {Array}
 */
export const getRecordTypeFilters = () => Object.values(EnumRecordType).map(type => ({
    value: type,
    text: getRecordTypeName(type)
}));

/**
 * Get filters for one-level items
 * @param {Array} items
 */
export const getItemFilters = items => items.map(({ name }) => ({
    value: name,
    text: name
}));

/**
 * Get filters for categories
 * @param {Array} categories
 * @returns {Array}
 */
export const getCategoryFilters = categories => {
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

/**
 * Get record list sorted by consumeDate
 * @param {Array} list
 * @returns {Array}
 */
const getRecordListSortedByDate = list => list.sort((a, b) => {
    const aConsumeDate = moment(a.consumeDate, CONSUME_DATE_FORMAT);
    const bConsumeDate = moment(b.consumeDate, CONSUME_DATE_FORMAT);
    const aCreatedAt = moment(a.createdAt, CONSUME_DATE_FORMAT);
    const bCreatedAt = moment(b.createdAt, CONSUME_DATE_FORMAT);

    if (aConsumeDate.isSame(bConsumeDate)) {
        return aCreatedAt.isSame(bCreatedAt) ? 0 : (aCreatedAt.isBefore(bCreatedAt) ? 1 : -1);
    }

    return aConsumeDate.isBefore(bConsumeDate) ? 1 : -1;
});