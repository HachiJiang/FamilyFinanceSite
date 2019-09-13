'use strict';

/*
 *
 * TotalKPIPanel to show Key factors compared with targets
 *
 */

import React, { PropTypes } from 'React';
import { Row, Col, Icon } from 'antd';
import LiquidFill from '../myecharts/LiquidFill';
import Pie from '../myecharts/Pie';

const CHART_HEIGHT = '200px';

/**
 * Get chart options for balance
 * @param {number} totalBalance
 * @returns {{series: *[]}}
 */
const getOptionsForBalance = totalBalance => {
    const target = 1200000; // @TODO: hardcode target
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
            data: _.map(items, item => ({ value: Math.abs(item.balance), name: item.name }))
        }]
    };
};

const getValidDebt = items => _.map(items, (item) => ({ 
    ...item,
    balance: parseInt(Number(Number(item.balance).toFixed(0))),
})).filter(item => !!item.balance);

const TotalKPIPanel = props => {
    const totalBalance = Number.parseInt(props.data.totalBalance || 0);
    const loanees = getValidDebt(props.data.loanees);
    const loaners = getValidDebt(props.data.loaners);

    console.log(loaners, loanees)

    return (
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
                    <h2>总负债: <span className="kpi-value">{ (Math.abs(_.sumBy(loaners, d => d.balance))) }</span></h2>
                    <Pie height={ CHART_HEIGHT } options={ getOptionsForDebt(loaners) } />
                </Col>

                <Col span={8}>
                    <h2>总借出: <span className="kpi-value">{ (Math.abs(_.sumBy(loanees, d => d.balance))) }</span></h2>
                    <Pie height={ CHART_HEIGHT } options={ getOptionsForDebt(loanees) } />
                </Col>
            </Row>
            <div className="redirect-link">
                <Icon type="arrow-right" />
                <a href="/accounts"> 账户管理</a>
            </div>
        </div>
    );
};

TotalKPIPanel.propTypes = {
    data: PropTypes.shape({
        totalBalance: PropTypes.number,
        loanees: PropTypes.array,
        loaners: PropTypes.array
    }).isRequired
};

export default TotalKPIPanel;