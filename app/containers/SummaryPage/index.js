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
import { CHART_HEIGHT } from '../../constants/Config';

// Components
import { Radio } from 'antd';
import Line from '../../components/myecharts/Line';
import TotalKPIPanel from '../../components/TotalKpiPanel';

// Actions
import * as CategoryAccountActionCreators from '../../actions/schema/account';
import * as CategoryOutcomeActionCreators from '../../actions/schema/outcome';
import * as MemberActionCreators from '../../actions/schema/member';
import * as DebtorActionCreators from '../../actions/schema/debtor';
import * as SummaryPageActionCreators from '../../actions/summaryPage';

// Selectors
import { getKpiInfo, getTotalData } from './selectors';

const { Button, Group } = Radio;

/**
 * Get options for line chart of total income/outcome/profit
 * @param {Array} incomeByDate
 * @param {Array} outcomeByDate
 * @param {Array} profitByDate
 * @returns {Object}
 */
const getOptionsForLine = (incomeByDate = [], outcomeByDate = [], profitByDate = []) => {
    const arr = [{
        name: '总净收益',
        data: profitByDate
    }, {
        name: '总收入',
        data: incomeByDate
    }, {
        name: '总支出',
        data: outcomeByDate
    }];

    const series = _.map(arr, ({ name, data }) => ({
        name: name,
        type: 'line',
        data
    }));

    return {
        title: {
            text: '总净收益/总收入/总支出曲线'
        },
        legend: {
            data: ['总净收益', '总收入', '总支出']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _.map(incomeByDate, item => item.name)  // date
        },
        series
    };
};

class SummaryPage extends Component {

    componentDidMount() {
        const { dispatch, totalData: { dateMode } } = this.props;
        CategoryAccountActionCreators.fetchCategories(dispatch);   // 请求账户信息
        CategoryOutcomeActionCreators.fetchCategories(dispatch);   // 请求支出类别信息
        DebtorActionCreators.fetchDebtors(dispatch);               // 请求debtor信息
        MemberActionCreators.fetchMembers(dispatch);               // 请求Member信息
        SummaryPageActionCreators.fetchTotalInfo(dispatch, dateMode);
    }

    render() {
        const { kpiInfo, totalData } = this.props;
        const { dateMode = '', incomeByDate, outcomeByDate, profitByDate } = totalData;

        return (
            <div className='summary-page'>
                <TotalKPIPanel data={ kpiInfo } />

                <div className='section-panel'>
                    <Group value={ dateMode } onChange={function(){}}>
                        <Button value="year">年</Button>
                        <Button value="month">月</Button>
                    </Group>
                    <br /><br />
                    {
                        (incomeByDate.length > 0 || outcomeByDate.length > 0) &&
                        <Line height={ CHART_HEIGHT } options={ getOptionsForLine(incomeByDate, outcomeByDate, profitByDate) } />
                    }
                </div>
            </div>
        );
    }
}

SummaryPage.propTypes = {
    kpiInfo: PropTypes.object.isRequired,
    dateMode: PropTypes.string,
    incomeByDate: PropTypes.array,
    outcomeByDate: PropTypes.array,
    profitByDate: PropTypes.array
};

const mapStateToProps = state => ({
    kpiInfo: getKpiInfo(state),
    totalData: getTotalData(state)
});

export default connect(mapStateToProps)(SummaryPage);