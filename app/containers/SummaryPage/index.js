'use strict';

/*
 * summaryPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import KPIPanel from './TotalKPIPanel';
import OutcomeKpiPanel from './OutcomeKpiPanel';

// Actions
import * as CategoryAccountActionCreators from '../../actions/schema/account';
import * as DebtorActionCreators from '../../actions/schema/debtor';
import * as SummaryPageActionCreators from '../../actions/summaryPage';

import { getKpiInfo, getOutcomeInfo } from './selectors';
import { getDateRange } from '../../utils/dateUtils';

import { OUTCOME } from '../../constants/EnumRecordType';

class SummaryPage extends Component {

    componentDidMount() {
        const { dispatch, outcomeInfo: { dateStr } } = this.props;
        const { fDate, tDate } = getDateRange(dateStr);
        CategoryAccountActionCreators.fetchCategories(dispatch);   // 请求账户信息
        DebtorActionCreators.fetchDebtors(dispatch);               // 请求debtor信息
        SummaryPageActionCreators.fetchOutcomeInfo(dispatch, OUTCOME, 'consumeDate', fDate, tDate);
    }

    render() {
        const { dispatch, kpiInfo, outcomeInfo = {} } = this.props;
        const changeMonth = bindActionCreators(SummaryPageActionCreators.changeMonth, dispatch);

        return (
            <div className='summary-page'>
                <KPIPanel data={ kpiInfo } />
                <OutcomeKpiPanel
                    data={ outcomeInfo }
                    onMonthChange={ changeMonth }
                />
                <div>按年的总支出/总收入/净收益曲线</div>
            </div>
        );
    }
}

SummaryPage.propTypes = {
    kpiInfo: PropTypes.object.isRequired,
    outcomeInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    kpiInfo: getKpiInfo(state),
    outcomeInfo: getOutcomeInfo(state)
});

export default connect(mapStateToProps)(SummaryPage);