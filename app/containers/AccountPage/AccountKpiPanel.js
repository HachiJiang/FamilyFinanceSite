'use strict';

/*
 *
 * Account KPI Panel
 *
 */
import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import { Row, Col } from 'antd';
import Pie from '../../components/myecharts/Pie';

import { getAllAccountNames, getCatDataForPie, getAccountDataForPie } from './selectors';
import { getTotalBalance } from '../../utils/accountUtils';

/**
 * Get options for pie chart
 * @param {Array} accounts
 */
const getPieChartOptions = accounts => {
    const name = '账户余额';
    const type = 'pie';
    const accountData = getAccountDataForPie(accounts);

    return {
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

class AccountKpiPanel extends Component {

    render() {
        const { accounts } = this.props;
        const totals = getTotalBalance(accounts);

        return (
            <Row className="account-kpi section-panel" type="flex" justify="space-around" align="middle">
                <Col span={7}>
                    <h1 style={ { fontSize: "2em" } }>总资产</h1>
                    <h1 className="kpi-value" style={ { fontSize: "3em" } }>{ totals }</h1>
                </Col>
                <Col span={17} style={ { margin: "30px -50px -50px 0" } }>
                    <Pie options={ getPieChartOptions(accounts) }  height="500px"></Pie>
                </Col>
            </Row>
        );
    }
}

AccountKpiPanel.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountKpiPanel;