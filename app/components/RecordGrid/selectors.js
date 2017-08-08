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
 * Get filters for members
 * @param {Array} members
 */
export const getMemberFilters = members => members.map(({ name }) => ({
    value: name,
    text: name
}));

/**
 * Get record list sorted by consumeDate
 * @param {Array} list
 * @returns {Array}
 */
const getRecordListSortedByDate = list => _.orderBy(list, ['consumeDate', 'createdAt'], ['desc', 'asc']);