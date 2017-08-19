'use strict';

/*
 *
 * OutcomeKpiPanel
 *
 */
import _ from 'lodash';
import moment from 'moment';
import React, { PropTypes } from 'React';
import { DatePicker } from 'antd';
import Line from '../../components/myecharts/Line';

import { getMovingAvg } from '../../utils/arrUtils';
import { MONTH_FORMAT } from '../../constants/Config';

const CHART_HEIGHT = '300px';
const { MonthPicker } = DatePicker;

/**
 * Get options for line chart
 * @param {Array} amountByDay
 * @returns {Object}
 */
const getOptionsForAmountByDay = amountByDay => {
    return {
        title: {
            text: '支出曲线'
        },
        legend: {
            data: ['每日实际支出', '日均支出变化']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _.map(amountByDay, (item, index) => index + 1) // @TODO: parse date
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
    };
};

const OutcomeKpiPanel = ({ data: { dateStr = '', amountByDay = [], amountByCat = [] }, onMonthChange = ''}) => (
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
        <div>按月的各类别支出饼图</div>
        <div>按成员的支出饼图</div>
    </div>
);

OutcomeKpiPanel.propTypes = {
    data: PropTypes.shape({
        dateStr: PropTypes.string.isRequired,
        amountByDay: PropTypes.array,
        amountByCat: PropTypes.array
    }).isRequired,
    onMonthChange: PropTypes.func.isRequired
};

export default OutcomeKpiPanel;