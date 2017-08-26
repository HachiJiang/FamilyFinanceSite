'use strict';

import moment from 'moment';

import * as RecordPageActionTypes from '../actiontypes/recordPage';

import * as AccountActionCreators from './schema/account';
import * as DebtMemberActionCreators from './schema/debtor';
import * as IncomeActionCreators from './schema/income';
import * as MemberActionCreators from './schema/member';
import * as OutcomeActionCreators from './schema/outcome';
import * as ProjectActionCreators from './schema/project';
import * as RecordActionCreators from './schema/record';
import { fetchAggregationAmount } from './aggregation';

// Constants
import { MONTH_FORMAT } from '../constants/Config';
import { OUTCOME } from '../constants/EnumRecordType.js';

// Utils
import { getDateRangeOfMonth } from '../utils/dateUtils';

/**
 * Fetch Schema
 */
const fetchSchema = dispatch => {
    // @TODO: Promise.all?? update state once all request done?
    AccountActionCreators.fetchCategories(dispatch);
    DebtMemberActionCreators.fetchDebtors(dispatch);
    IncomeActionCreators.fetchCategories(dispatch);
    MemberActionCreators.fetchMembers(dispatch);
    OutcomeActionCreators.fetchCategories(dispatch);
    ProjectActionCreators.fetchCategories(dispatch);
};

/**
 * Fetch records
 * @param dispatch
 * @param month
 */
const fetchRecordsByMonth = (dispatch, month) => {
    const range = getDateRangeOfMonth(moment(month, MONTH_FORMAT));
    dispatch(RecordActionCreators.fetchRecords(range.fDate, range.tDate));
};

const changeMonth = month => ({
    type: RecordPageActionTypes.CHANGE_MONTH,
    month
});

/**
 * Get action for amountByDay received
 * @param {Array} amountByDay
 */
const receiveAmountByDay = amountByDay => ({
    type: RecordPageActionTypes.OUTCOME_BY_DAY_RECEIVED,
    amountByDay
});

/**
 * Get action for amountByCat received
 * @param {Array} amountByCat
 */
const receiveAmountByCat = amountByCat => ({
    type: RecordPageActionTypes.OUTCOME_BY_CAT_RECEIVED,
    amountByCat
});

/**
 * Get action for amountByCat received
 * @param {Array} amountByMember
 */
const receiveAmountByMember = amountByMember => ({
    type: RecordPageActionTypes.OUTCOME_BY_MEMBER_RECEIVED,
    amountByMember
});

/**
 * Fetch outcome info
 * @param {Object} dispatch
 * @param {String} month
 */
const fetchOutcomeInfo = (dispatch, month) => {
    const { fDate, tDate } = getDateRangeOfMonth(moment(month, MONTH_FORMAT));

    dispatch(changeMonth(month));

    dispatch(
        fetchAggregationAmount(OUTCOME, 'day', receiveAmountByDay, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(OUTCOME, 'category', receiveAmountByCat, fDate, tDate)
    );

    dispatch(
        fetchAggregationAmount(OUTCOME, 'member', receiveAmountByMember, fDate, tDate)
    );
};

export {
    fetchSchema,
    fetchRecordsByMonth,
    fetchOutcomeInfo
}