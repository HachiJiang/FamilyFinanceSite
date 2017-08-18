'use strict';

/*
 *
 * OutcomeKpiPanel
 *
 */
import _ from 'lodash';
import React, { PropTypes } from 'React';
import Line from '../../components/myecharts/Line';

import { getMovingAvg } from '../../utils/arrUtils';

const CHART_HEIGHT = '200px';

/**
 * Get options for line chart
 * @param {Array} amountByDay
 * @returns {Object}
 */
const getOptionsForAmountByDay = amountByDay => {
    const outcomeData = _.map(amountByDay, item => item.amount);
    return {
        title: {
            text: '日均支出曲线'
        },
        legend: {
            data: ['每日实际支出', '日均支出变化']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _.map(amountByDay, item => item._id) // @TODO: parse date
        },
        series: [{
            name: '每日实际支出',
            type: 'line',
            data: outcomeData,
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' }
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }, {
            name: '日均支出变化',
            type: 'line',
            data: getMovingAvg(outcomeData)
        }]
    };
};

const OutcomeKpiPanel = ({year = '', month = '', amountByDay = [], amountByCat = []}) => (
    <div className='outcome-kpi-panel section-panel'>
        <div>Filter</div>
        <Line height={ CHART_HEIGHT } options={ getOptionsForAmountByDay(amountByDay) } />
        <div>按月的各类别支出饼图</div>
    </div>
);

OutcomeKpiPanel.propTypes = {
    data: PropTypes.shape({
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        amountByDay: PropTypes.array,
        amountByCat: PropTypes.array
    }).isRequired
};

export default OutcomeKpiPanel;