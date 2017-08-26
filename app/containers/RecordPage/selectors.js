'use strict';

/**
 * RecordPage selectors
 */
import _ from 'lodash';
import moment from 'moment';
import { getSchemaObjects, getOutcomeCategories, getMembers } from '../App/selectors';
import { parseRecord } from '../../utils/recordUtils';
import { getFirstLastDayOfMonth } from '../../utils/dateUtils';
import { parseAmountBySubcat, getAmountByCat, parseAmountByMembers } from '../../utils/aggregationUtils';
import { MONTH_FORMAT, DECIMAL_PRECISION } from '../../constants/Config';

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
const getRecordList = state => {
    const list = getRecordPageData(state).list;
    const schema = getSchemaObjects(state);
    return _.map(list, record => parseRecord(record, schema));
};

/**
 * Get selected month
 * @param {Object} state
 * @returns {String}
 */
const getMonth = state => getRecordPageData(state).month;

/**
 * Fill amount for each day
 * @param {String} month
 * @param {Array} raw
 * @returns {Array}
 */
const fillAmountInWholeMonth = (month, raw) => {
    const date = moment(month, MONTH_FORMAT);
    const range = getFirstLastDayOfMonth(date.year(), date.month());

    if (!range || raw.length < 1) {
        return raw;
    }

    const lastDay = moment(range.lastDay).format('DD');
    let result = new Array(_.toNumber(lastDay));
    _.fill(result, 0);

    _.forEach(raw, item => {
        const day = item._id.day;
        result[_.toNumber(day) - 1] = _.toNumber(item.value.toFixed(DECIMAL_PRECISION));
    });
    return result;
};

/**
 * Get outcome info
 * @param {Object} state
 */
const getOutcomeInfo = state => {
    const { month, outcome } = getRecordPageData(state);
    const amountBySubcat = parseAmountBySubcat(outcome.amountByCat, getOutcomeCategories(state));

    return {
        month,
        amountByDay: fillAmountInWholeMonth(month, outcome.amountByDay),
        amountByCat: getAmountByCat(amountBySubcat),
        amountBySubcat: amountBySubcat,
        amountByMember: parseAmountByMembers(outcome.amountByMember, getMembers(state))
    };
};

export {
    getRecordList,
    getOutcomeInfo,
    getMonth
}