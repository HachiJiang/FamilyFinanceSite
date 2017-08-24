'use strict';

/*
 *
 * TotalKPIPanel to show Key factors compared with targets
 *
 */

import React, { PropTypes } from 'React';
import { Row, Col, Icon, Radio } from 'antd';
import LiquidFill from '../myecharts/LiquidFill';
import Pie from '../myecharts/Pie';
import Line from '../myecharts/Line';

const { Button, Group } = Radio;
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

/**
 * Get chart options for debt
 * @param {Array} items
 * @returns {{series: *[]}}
 */
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

const TotalKPIPanel = ({ data: { totalBalance = 0, loanees = [], loaners = [], dateMode = '' } }) => (
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
                <Pie height={ CHART_HEIGHT } />
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
        <div>
            <Group value={ dateMode } onChange={function(){}}>
                <Button value="year">年</Button>
                <Button value="month">月</Button>
            </Group>
            <br /><br />
            <Line height={ CHART_HEIGHT } options={ getOptionsForDebt(loaners) } ></Line>
        </div>
    </div>
);

TotalKPIPanel.propTypes = {
    data: PropTypes.shape({
        totalBalance: PropTypes.number,
        loanees: PropTypes.array,
        loaners: PropTypes.array,
        dateMode: PropTypes.string,
        incomeByDate: PropTypes.array,
        outcomeByDate: PropTypes.array
    }).isRequired
};

export default TotalKPIPanel;