'use strict';

import * as AccountActionCreators from './schema/account';
import * as DebtMemberActionCreators from './schema/debtor';
import * as IncomeActionCreators from './schema/income';
import * as MemberActionCreators from './schema/member';
import * as OutcomeActionCreators from './schema/outcome';
import * as ProjectActionCreators from './schema/project';
import * as RecordActionCreators from './schema/record';
import * as RecordPageActionTypes from '../actiontypes/recordPage';

/**
 * Fetch Schema
 */
export const fetchSchema = dispatch => {
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
 * @param range
 */
export const fetchRecords = (dispatch, range = {}) => dispatch(RecordActionCreators.fetchRecords(range.fDate, range.tDate));

/**
 * Change date range of record page, need re-fetch records from server
 * @param {String} fDate
 * @param {String} tDate
 */
export const changeDateRange = (fDate, tDate) => RecordActionCreators.fetchRecords(fDate, tDate, data => ({
    type: RecordPageActionTypes.CHANGE_DATERANGE,
    fDate,
    tDate,
    data
}));