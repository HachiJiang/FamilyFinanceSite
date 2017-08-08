'use strict';

/**
 * RecordPage selectors
 */
import _ from 'lodash';
import { getSchemaObjects } from '../App/selectors';
import { parseRecord } from '../../utils/recordUtils';

/**
 * Get record page data
 * @param {Object} state
 * @returns {*}
 */
const getRecordPageData = state => state.get('recordPage');

/**
 * Get record list
 * @param {Object} state
 * @returns {*}
 */
export const getRecordList = state => {
    const list = getRecordPageData(state).list;
    const schema = getSchemaObjects(state);
    return _.map(list, record => parseRecord(record, schema));
};

/**
 * Get time range
 * @param {Object} state
 * @returns {{}}
 */
export const getRange = state => getRecordPageData(state).filter;