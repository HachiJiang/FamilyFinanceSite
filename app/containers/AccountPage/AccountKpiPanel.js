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

/**
 * Get balance totals
 * @param {Array} accounts
 */
const getTotals = accounts => _.sumBy(accounts, cat => _.toNumber(cat.balance));

/**
 * Get options for pie chart
 * @param {Array} accounts
 */
const getPieChartOptions = accounts => ({
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
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
            data:[
                {value:335, name:'直达', selected:true},
                {value:679, name:'营销广告'},
                {value:1548, name:'搜索引擎'}
            ]
        },
        {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '55%'],

            data:[
                {value:335, name:'直达'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1048, name:'百度'},
                {value:251, name:'谷歌'},
                {value:147, name:'必应'},
                {value:102, name:'其他'}
            ]
        }
    ]
});

const updatePieChart = (pieChart, accounts, pieDom) => {
    if (!pieDom) {
        return;
    }

    if (!accounts || accounts.length < 1) {
        pieDom.innerHTML = '很遗憾, 没有资产记录...';
        return;
    }

    const options = getPieChartOptions(accounts);
    if (pieChart && options) {
        pieChart.setOption(options);
    }
};

class AccountKpiPanel extends Component {

    componentDidMount() {
        const pieDom = this.pieDom;

        if (!pieDom) {
            return;
        }

        const pieChart = this.pieChart = echarts.init(pieDom);
        updatePieChart(pieChart, this.props.accounts, pieDom);
    }

    componentWillReceiveProps(nextProps) {
        updatePieChart(this.pieChart, nextProps.accounts, this.pieDom);
    }

    render() {
        const { accounts } = this.props;
        const totals = getTotals(accounts);

        return (
            <Row className="account-kpi" type="flex" justify="space-around" align="middle">
                <Col span={3}>
                    <h1 style={ { color: "red"} }>总资产: { totals }</h1>
                </Col>
                <Col span={9}>
                    <div ref={ div => { this.pieDom = div } }></div>
                </Col>
            </Row>
        );
    }
}

AccountKpiPanel.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountKpiPanel;