'use strict';

/*
 *
 * KPIPanel to show Key factors compared with targets
 *
 */

import React, { PropTypes } from 'React';
import { Row, Col, Icon } from 'antd';
import LiquidFill from '../../components/myecharts/LiquidFill';
import Pie from '../../components/myecharts/Pie';

const CHART_HEIGHT = '200px';

/**
 * Get chart options for balance
 * @param {number} totalBalance
 * @returns {{series: *[]}}
 */
const getOptionsForBalance = totalBalance => {
    const target = 400000; // @TODO: hardcode target
    return {
        series: [{
            type: 'liquidFill',
            data: [totalBalance / target],
            radius: '80%'
        }]
    }
};

const getOptionsForDebt = items => {
    return {
        series: [{
            name:'债务',
            type:'pie',
            radius: '80%',
            data:_.map(items, item => ({ value: Math.abs(item.balance), name: item.name }))
        }]
    };
};

const KPIPanel = ({ data: { totalBalance = 0, loanees = [], loaners = [] } }) => (
    <div className='section-panel'>
        <Row type="flex" justify="space-around" align="middle">
            <Col span={8}>
                <h2>总资产: <span className="kpi-value">{ totalBalance }</span></h2>
                <LiquidFill
                    height={ CHART_HEIGHT }
                    options={ getOptionsForBalance(totalBalance) }
                    />
            </Col>

            <Col span={8}>
                <h2>总负债: <span className="kpi-value">{ Math.abs(_.sumBy(loaners, d => d.balance)) }</span></h2>
                <Pie height={ CHART_HEIGHT } options={ getOptionsForDebt(loaners) } />
            </Col>

            <Col span={8}>
                <h2>总借出: <span className="kpi-value">{ Math.abs(_.sumBy(loanees, d => d.balance)) }</span></h2>
                <Pie height={ CHART_HEIGHT } options={ getOptionsForDebt(loanees) } />
            </Col>
        </Row>
        <div className="redirect-link">
            <Icon type="arrow-right" />
            <a href="/accounts"> 账户管理</a>
        </div>
    </div>
);

KPIPanel.propTypes = {
    data: PropTypes.shape({
        totalBalance: PropTypes.number,
        loanees: PropTypes.array,
        loaners: PropTypes.array
    }).isRequired
};

export default KPIPanel;