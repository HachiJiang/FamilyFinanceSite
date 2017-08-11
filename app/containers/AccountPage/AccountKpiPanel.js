'use strict';

/*
 *
 * Account KPI Panel
 *
 */
import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import { Row, Col } from 'antd';
import echarts from 'echarts';

import { getAllAccountNames, getCatDataForPie, getAccountDataForPie } from './selectors';

/**
 * Get balance totals
 * @param {Array} accounts
 */
const getTotals = accounts => _.sumBy(accounts, cat => _.toNumber(cat.balance));

/**
 * Get options for pie chart
 * @param {Array} accounts
 */
const getPieChartOptions = accounts => {
    const name = '账户余额';
    const type = 'pie';
    const accountData = getAccountDataForPie(accounts);

    return {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: _.map(accountData, account => account.name)
        },
        series: [{
            name, type,
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: getCatDataForPie(accounts)
        }, {
            name, type,
            radius: ['40%', '55%'],
            data: getAccountDataForPie(accounts)
        }]
    };
};

const updatePieChart = (accounts, pieDom) => {
    if (!pieDom) {
        return;
    }

    if (!accounts || accounts.length < 1) {
        pieDom.innerHTML = '很遗憾, 没有资产记录...';
        return;
    }

    pieDom.innerHTML = '';

    const pieChart = echarts.init(pieDom);
    const options = getPieChartOptions(accounts);
    if (pieChart && options) {
        pieChart.setOption(options);
    }
};

class AccountKpiPanel extends Component {

    componentWillReceiveProps(nextProps) {
        updatePieChart(nextProps.accounts, this.pieDom);
    }

    render() {
        const { accounts } = this.props;
        const totals = getTotals(accounts);

        return (
            <Row className="account-kpi" type="flex" justify="space-around" align="middle">
                <Col span={7}>
                    <h1>总资产</h1>
                    <h1>{ totals }</h1>
                </Col>
                <Col span={17}>
                    <div ref={ div => { this.pieDom = div } } style={ { width: "100%", height: "500px", margin: "30px -20px -50px 0" } }></div>
                </Col>
            </Row>
        );
    }
}

AccountKpiPanel.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountKpiPanel;