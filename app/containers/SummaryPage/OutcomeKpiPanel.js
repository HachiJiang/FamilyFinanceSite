'use strict';

/*
 *
 * OutcomeKpiPanel
 *
 */

import React, { PropTypes } from 'React';
import Pie from '../../components/myecharts/Pie';
import Bar from '../../components/myecharts/Bar';

const CHART_HEIGHT = '200px';

const OutcomeKpiPanel = ({ year = 0, month = 0, data = [] }) => (
    <div className='outcome-kpi-panel'>
        <div>按月的日(平均)支出曲线</div>
        <div>按月的各类别支出饼图</div>
    </div>
);

OutcomeKpiPanel.propTypes = {
    year: PropTypes.number,
    month: PropTypes.number,
    data: PropTypes.array.isRequired
};

export default OutcomeKpiPanel;