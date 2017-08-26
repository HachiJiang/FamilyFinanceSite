'use strict';

/*
 * RecordPage
 *
 * List finance records
 */
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import { DatePicker } from 'antd';
import RecordEditor from '../../components/RecordEditor';
import RecordList from '../../components/RecordList';
import OutcomeKpiPanel from '../../components/OutcomeKpiPanel';

// Actions
import * as CategoryOutcomeActionCreators from '../../actions/schema/outcome';
import * as CategoryIncomeActionCreators from '../../actions/schema/income';
import * as CategoryAccountActionCreators from '../../actions/schema/account';
import * as CategoryProjectActionCreators from '../../actions/schema/project';
import * as MemberActionCreators from '../../actions/schema/member';
import * as DebtMemberActionCreators from '../../actions/schema/debtor';
import * as RecordActionCreators from '../../actions/schema/record';
import * as RecordPageActionCreators from '../../actions/recordPage';

// Selectors
import { getOutcomeCategories, getIncomeCategories, getAccountCategories, getProjectCategories, getMembers, getDebtors } from '../App/selectors';
import { getRecordList, getOutcomeInfo, getMonth } from './selectors';

// Constants
import { MONTH_FORMAT } from '../../constants/Config';

const { MonthPicker } = DatePicker;

class RecordPage extends Component {

    componentDidMount() {
        const { dispatch, month } = this.props;
        RecordPageActionCreators.fetchSchema(dispatch);    // Async fetch
        RecordPageActionCreators.fetchRecordsByMonth(dispatch, month);
        RecordPageActionCreators.fetchOutcomeInfo(dispatch, month);
    }

    onMonthChange(month) {
        const { dispatch } = this.props;
        RecordPageActionCreators.fetchOutcomeInfo(dispatch, month);
        RecordPageActionCreators.fetchRecordsByMonth(dispatch, month)
    }

    render() {
        const { dispatch, schema, records, month, outcomeInfo } = this.props;
        const me = this;

        const addOutcomeCategory = bindActionCreators(CategoryOutcomeActionCreators.addCategory, dispatch); // Outcome
        const addIncomeCategory = bindActionCreators(CategoryIncomeActionCreators.addCategory, dispatch);   // Income
        const addAccountCategory = bindActionCreators(CategoryAccountActionCreators.addCategory, dispatch); // Account
        const addProjectCategory = bindActionCreators(CategoryProjectActionCreators.addCategory, dispatch); // Project
        const addMember = bindActionCreators(MemberActionCreators.addMember, dispatch);                     // Member
        const addDebtor = bindActionCreators(DebtMemberActionCreators.addDebtor, dispatch);                 // Debt Member
        const addRecord = bindActionCreators(RecordActionCreators.addRecord, dispatch);                     // Add record
        const updateRecord = bindActionCreators(RecordActionCreators.updateRecord, dispatch);               // Update record
        const deleteRecord = bindActionCreators(RecordActionCreators.deleteRecord, dispatch);               // Delete record

        const createEditor = record => (
            <RecordEditor
                schema={ me.props.schema }
                addOutcomeCategory={ addOutcomeCategory }
                addIncomeCategory={ addIncomeCategory }
                addAccountCategory={ addAccountCategory }
                addProjectCategory={ addProjectCategory }
                addMember={ addMember }
                addDebtor={ addDebtor }
                addRecord={ addRecord }
                updateRecord={ updateRecord }
                record={ record }
            />
        );

        return (
            <div>
                { createEditor() }
                <div className='section-panel'>
                    <div className='section-panel-header'>
                        <span>月份: </span>
                        <MonthPicker
                            placeholder="Select month"
                            value={ moment(month, MONTH_FORMAT) }
                            onChange={ month => this.onMonthChange(month.format(MONTH_FORMAT)) }
                        />
                    </div>
                    <OutcomeKpiPanel data={ outcomeInfo } />
                    <RecordList
                        records={ records }
                        schema={ schema }
                        deleteRecord={ deleteRecord }
                        createEditor={ createEditor }
                    />
                </div>
            </div>
        );
    }
}

RecordPage.propTypes = {
    records: PropTypes.array.isRequired,
    schema: PropTypes.shape({
        outcomeCategories: PropTypes.arrayOf(PropTypes.object),
        incomeCategories: PropTypes.arrayOf(PropTypes.object),
        accountCategories: PropTypes.arrayOf(PropTypes.object),
        projectCategories: PropTypes.arrayOf(PropTypes.object),
        members: PropTypes.arrayOf(PropTypes.object),
        debtors: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    month: PropTypes.string.isRequired,
    outcomeInfo: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    schema: {
        outcomeCategories: getOutcomeCategories(state),
        incomeCategories: getIncomeCategories(state),
        accountCategories: getAccountCategories(state),
        projectCategories: getProjectCategories(state),
        members: getMembers(state),
        debtors: getDebtors(state)
    },
    month: getMonth(state),
    outcomeInfo: getOutcomeInfo(state),
    records: getRecordList(state)
});

export default connect(mapStateToProps)(RecordPage);