/*
 * RecordPage
 *
 * List finance records
 */

// Libs
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

// Components
import RecordEditor from '../../components/RecordEditor';
import RecordList from '../../components/RecordList';

// Actions
import * as CategoryOutcomeActionCreators from '../../actions/categoryOutcome';
import * as CategoryIncomeActionCreators from '../../actions/categoryIncome';
import * as CategoryAccountActionCreators from '../../actions/categoryAccount';
import * as CategoryProjectActionCreators from '../../actions/categoryProject';
import * as MemberActionCreators from '../../actions/member';
import * as DebtMemberActionCreators from '../../actions/debtMember';

// Selectors
import { getOutcomeCategories, getIncomeCategories, getAccountCategories, getProjectCategories,
    getMembers, getDebtMembers, getRecordList, getRange, getTotals } from './selectors';

class RecordPage extends Component {

    render() {
        const { dispatch, outcomeCategories, incomeCategories, accountCategories, projectCategories,
            members, debtMembers, range, records, totals } = this.props;

        // Outcome
        const addCategoryOutcome = bindActionCreators(CategoryOutcomeActionCreators.addCategory, dispatch);

        // Income
        const addCategoryIncome = bindActionCreators(CategoryIncomeActionCreators.addCategory, dispatch);

        // Account
        const addCategoryAccount = bindActionCreators(CategoryAccountActionCreators.addCategory, dispatch);

        // Project
        const addCategoryProject = bindActionCreators(CategoryProjectActionCreators.addCategory, dispatch);

        // Member
        const addMember = bindActionCreators(MemberActionCreators.addMember, dispatch);

        // Debt Member
        const addDebtMember = bindActionCreators(DebtMemberActionCreators.addMember, dispatch);

        return (
            <div>
                <RecordEditor outcomeCategories={ outcomeCategories }
                              incomeCategories={ incomeCategories }
                              accountCategories={ accountCategories }
                              projectCategories={ projectCategories }
                              members={ members }
                              debtMembers={ debtMembers }
                              addCategoryOutcome={ addCategoryOutcome }
                              addCategoryIncome={ addCategoryIncome }
                              addCategoryAccount={ addCategoryAccount }
                              addCategoryProject={ addCategoryProject }
                              addMember={ addMember }
                              addDebtMember={ addDebtMember }
                    />
                <RecordList range={ range }
                            records={ records }
                            totalIncome={ totals.income }
                            totalOutcome={ totals.outcome }
                    />
            </div>
        );
    }
}

RecordPage.propTypes = {
    range: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    }).isRequired,
    records: PropTypes.array.isRequired,
    totals: PropTypes.object.isRequired,
    outcomeCategories: PropTypes.array.isRequired,
    incomeCategories: PropTypes.array.isRequired,
    accountCategories: PropTypes.array.isRequired,
    projectCategories: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired,
    debtMembers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    outcomeCategories: getOutcomeCategories(state),
    incomeCategories: getIncomeCategories(state),
    accountCategories: getAccountCategories(state),
    projectCategories: getProjectCategories(state),
    members: getMembers(state),
    debtMembers: getDebtMembers(state),
    records: getRecordList(state),
    range: getRange(state),
    totals: getTotals(state)
});

export default connect(mapStateToProps)(RecordPage);
