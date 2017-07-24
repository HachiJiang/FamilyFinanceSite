'use strict';

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
import * as CategoryOutcomeActionCreators from '../../actions/schema/outcome';
import * as CategoryIncomeActionCreators from '../../actions/schema/income';
import * as CategoryAccountActionCreators from '../../actions/schema/account';
import * as CategoryProjectActionCreators from '../../actions/schema/project';
import * as MemberActionCreators from '../../actions/schema/member';
import * as DebtMemberActionCreators from '../../actions/schema/debtor';
import * as RecordActionCreators from '../../actions/schema/record';
import { fetchSchema, fetchRecords } from '../../actions/recordPage';

// Selectors
import { getOutcomeCategories, getIncomeCategories, getAccountCategories, getProjectCategories,
    getMembers, getDebtMembers, getRecordList, getRange } from './selectors';

class RecordPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        fetchSchema(dispatch);    // Async fetch
        fetchRecords(dispatch);
    }

    render() {
        const { dispatch, outcomeCategories, incomeCategories, accountCategories, projectCategories,
            members, debtors, range, records } = this.props;

        const addOutcomeCategory = bindActionCreators(CategoryOutcomeActionCreators.addCategory, dispatch); // Outcome
        const addIncomeCategory = bindActionCreators(CategoryIncomeActionCreators.addCategory, dispatch);   // Income
        const addAccountCategory = bindActionCreators(CategoryAccountActionCreators.addCategory, dispatch); // Account
        const addProjectCategory = bindActionCreators(CategoryProjectActionCreators.addCategory, dispatch); // Project
        const addMember = bindActionCreators(MemberActionCreators.addMember, dispatch);                     // Member
        const addDebtor = bindActionCreators(DebtMemberActionCreators.addMember, dispatch);                 // Debt Member
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
                              debtors={ debtors }
                              addOutcomeCategory={ addOutcomeCategory }
                              addIncomeCategory={ addIncomeCategory }
                              addAccountCategory={ addAccountCategory }
                              addProjectCategory={ addProjectCategory }
                              addMember={ addMember }
                              addDebtor={ addDebtor }
                              addRecord={ addRecord }
                              updateRecord={ updateRecord }
                    />
                <RecordList range={ range }
                            records={ records }
                            members={ members }
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
    debtors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    outcomeCategories: getOutcomeCategories(state),
    incomeCategories: getIncomeCategories(state),
    accountCategories: getAccountCategories(state),
    projectCategories: getProjectCategories(state),
    members: getMembers(state),
    debtors: getDebtMembers(state),
    records: getRecordList(state),
    range: getRange(state)
});

export default connect(mapStateToProps)(RecordPage);
