import moment from 'moment';
import * as EnumRecordType from '../../constants/EnumRecordType';
import { getRecordTypeName } from '../../utils/recordUtils';

export const getDataRows = records => getRecordListSortedByDate(records).map((record, index) => {
    return {
        ...record,
        key: index.toString(),
        text: getRecordTypeName(record.type),
        date: moment(record.consumeDate).format('YYYY-MM-DD')
    };
});

/**
 * Get filters for record types
 * @returns {Array}
 */
export const getRecordTypeFilters = () => Object.values(EnumRecordType).map(type => {
    return {
        value: type,
        text: getRecordTypeName(type)
    }
});

/**
 * Get filters for members
 * @param {Array} members
 */
export const getMemberFilters = members => members.map(({ name }) => {
    return {
        value: name,
        text: name
    }
});

/**
 * Get record list sorted by date
 * @param {Array} list
 * @returns {Array}
 */
const getRecordListSortedByDate = list => list.sort((a, b) => {
    return moment(a.date).isBefore(moment(b.date)) ? 1: -1;
});