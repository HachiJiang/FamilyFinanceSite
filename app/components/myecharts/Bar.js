'use strict';

/*
 *
 * Bar chart using echarts
 *
 */

import React from 'react';
import BaseEchart from './BaseEchart';

class Bar extends BaseEchart {
    constructor(props) {
        super(props);

        this.defaultOptions = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            }
        };
    }
}

Bar.propTypes = {
};

export default Bar;