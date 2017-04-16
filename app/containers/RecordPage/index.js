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
import * as RecordActionCreators from '../../actions/record';

// Selectors
import { getOutcomeCategories, getIncomeCategories, getAccountCategories, getProjectCategories,
    getMembers, getDebtMembers, getRecordList, getRange } from './selectors';

class RecordPage extends Component {

    render() {
        const { dispatch, outcomeCategories, incomeCategories, accountCategories, projectCategories,
            members, debtMembers, range, records } = this.props;

        const addCategoryOutcome = bindActionCreators(CategoryOutcomeActionCreators.addCategory, dispatch); // Outcome
        const addCategoryIncome = bindActionCreators(CategoryIncomeActionCreators.addCategory, dispatch);   // Income
        const addCategoryAccount = bindActionCreators(CategoryAccountActionCreators.addCategory, dispatch); // Account
        const addCategoryProject = bindActionCreators(CategoryProjectActionCreators.addCategory, dispatch); // Project
        const addMember = bindActionCreators(MemberActionCreators.addMember, dispatch);                     // Member
        const addDebtMember = bindActionCreators(DebtMemberActionCreators.addMember, dispatch);             // Debt Member
        const addRecord = bindActionCreators(RecordActionCreators.addRecord, dispatch);                     // Add record
        const updateRecord = bindActionCreators(RecordActionCreators.updateRecord, dispatch);               // Update record
        const deleteRecord = bindActionCreators(RecordActionCreators.deleteRecord, dispatch);               // Delete record

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
                              addRecord={ addRecord }
                              updateRecord={ updateRecord }
                    />
                <RecordList range={ range }
                            records={ records }
                            deleteRecord={ deleteRecord }
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
    range: getRange(state)
});

export default connect(mapStateToProps)(RecordPage);
