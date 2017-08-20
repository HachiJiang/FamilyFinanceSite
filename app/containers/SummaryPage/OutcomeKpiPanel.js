'use strict';

/*
 *
 * OutcomeKpiPanel
 *
 */
import _ from 'lodash';
import moment from 'moment';
import React, { PropTypes } from 'React';
import { DatePicker, Row, Col } from 'antd';
import Line from '../../components/myecharts/Line';
import Pie from '../../components/myecharts/Pie';

import { getMovingAvg } from '../../utils/arrUtils';
import { MONTH_FORMAT } from '../../constants/Config';

const CHART_HEIGHT = '300px';
const { MonthPicker } = DatePicker;

/**
 * Get options for line chart
 * @param {Array} amountByDay
 * @returns {Object}
 */
const getOptionsForAmountByDay = amountByDay => ({
    title: {
        text: '支出曲线'
    },
    legend: {
        data: ['每日实际支出', '日均支出变化']
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: _.map(amountByDay, (item, index) => index + 1)
    },
    series: [{
        name: '每日实际支出',
        type: 'line',
        data: amountByDay,
        markPoint: {
            data: [
                { type: 'min', name: '最小值' },
                { type: 'max', name: '最大值' }
            ],
            symbol: 'roundRect',
            symbolSize: [50, 30]
        },
        markLine: {
            data: [
                { type: 'average', name: '平均值' }
            ]
        }
    }, {
        name: '日均支出变化',
        type: 'line',
        data: getMovingAvg(amountByDay)
    }]
});

/**
 * Get options for amountByCat
 * @param {Array} amountByCat
 * @returns {Object}
 */
const getOptionsForAmountByCat = (amountByCat, amountBySubcat) => {
    const name = '类别支出';
    const type = 'pie';

    return {
        title: {
            text: name,
            subtext: '[后续支持显示各成员流水]'
        },
        series: [{
            name,
            type,
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
            data: amountByCat
        }, {
            name, type,
            radius: ['40%', '55%'],
            data: amountBySubcat
        }]
    };
};

/**
 * Get options for amountByMember
 * @param {Array} amountByMember
 * @returns {Object}
 */
const getOptionsForAmountByMember = (amountByMember) => {
    const name = '成员支出';
    const type = 'pie';

    return {
        title: {
            text: name,
            subtext: '[后续支持显示各成员流水]'
        },
        series: [{
            name,
            type,
            radius: '55%',
            center: ['50%', '55%'],
            roseType: 'radius',
            data: _.map(amountByMember, item => ({
                    ...item,
                    label: {
                        normal: {
                            formatter: '{b}: {c}'
                        }
                    }
                })
            )
        }]
    };
};

const OutcomeKpiPanel = ({ data: { dateStr = '', amountByDay = [], amountByCat = {}, amountBySubcat = [], amountByMember = [] }, onMonthChange = ''}) => (
    <div className='outcome-kpi-panel section-panel'>
        <div className='outcome-kpi-panel-header'>
            <span>月份: </span>
            <MonthPicker
                placeholder="Select month"
                value={ moment(dateStr, MONTH_FORMAT) }
                onChange={ val => onMonthChange(val.format(MONTH_FORMAT)) }
            />
        </div>
        <Line height={ CHART_HEIGHT } options={ getOptionsForAmountByDay(amountByDay) } />
        <Row type='flex' justify='space-around' align='middle'>
            <Col span={12}>
                <Pie height={ CHART_HEIGHT } options={ getOptionsForAmountByCat(amountByCat, amountBySubcat) } />
            </Col>
            <Col span={12}>
                <Pie height={ CHART_HEIGHT } options={ getOptionsForAmountByMember(amountByMember) } />
            </Col>
        </Row>
    </div>
);

OutcomeKpiPanel.propTypes = {
    data: PropTypes.shape({
        dateStr: PropTypes.string.isRequired,
        amountByDay: PropTypes.array,
        amountByCat: PropTypes.array,
        amountBySubcat: PropTypes.array,
        amountByMember: PropTypes.array
    }).isRequired,
    onMonthChange: PropTypes.func.isRequired
};

export default OutcomeKpiPanel;