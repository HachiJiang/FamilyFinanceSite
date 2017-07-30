'use strict';

import * as AccountActionCreators from './schema/account';
import * as DebtMemberActionCreators from './schema/debtor';
import * as IncomeActionCreators from './schema/income';
import * as MemberActionCreators from './schema/member';
import * as OutcomeActionCreators from './schema/outcome';
import * as ProjectActionCreators from './schema/project';
import * as RecordActionCreators from './schema/record';

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
 */
export const fetchRecords = dispatch => {
    dispatch(RecordActionCreators.fetchRecords());
};