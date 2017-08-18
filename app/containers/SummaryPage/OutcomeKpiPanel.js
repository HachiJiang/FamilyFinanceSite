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
    const outcomeData = _.map(amountByDay, item => _.toNumber(item.amount.toFixed()));
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
            data: _.map(amountByDay, item => moment(item._id).local().format('DD')) // @TODO: parse date
        },
        series: [{
            name: '每日实际支出',
            type: 'line',
            data: outcomeData,
            markPoint: {
                data: [
                    { type: 'min', name: '最小值' },
                    { type: 'max', name: '最大值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        }, {
            name: '日均支出变化',
            type: 'line',
            data: getMovingAvg(outcomeData)
        }]
    };
};

const OutcomeKpiPanel = ({ data: { dateStr = '', amountByDay = [], amountByCat = [] }, onMonthChange}) => (
    <div className='outcome-kpi-panel section-panel'>
        <div>
            <MonthPicker
                placeholder="Select month"
                value={ moment(dateStr, MONTH_FORMAT) }
                onChange={ onMonthChange }
            />
        </div>
        <Line height={ CHART_HEIGHT } options={ getOptionsForAmountByDay(amountByDay) } />
        <div>按月的各类别支出饼图</div>
    </div>
);

OutcomeKpiPanel.propTypes = {
    data: PropTypes.shape({
        dateStr: PropTypes.number.isRequired,
        amountByDay: PropTypes.array,
        amountByCat: PropTypes.array
    }).isRequired,
    onMonthChange: PropTypes.func.isRequired
};

export default OutcomeKpiPanel;