import * as CategoryOutcomeActionCreators from './categoryOutcome';
import * as CategoryIncomeActionCreators from './categoryIncome';
import * as CategoryAccountActionCreators from './accounts';
import * as CategoryProjectActionCreators from './categoryProject';
import * as MemberActionCreators from './member';
import * as DebtMemberActionCreators from './debtMember';

/**
 * Fetch Schema
 */
export const fetchSchema = dispatch => {
    dispatch(CategoryOutcomeActionCreators.fetchCategories());
    dispatch(CategoryAccountActionCreators.fetchCategories());
};

/**
 * Fetch records
 */
export const fetchRecords = () => {

};