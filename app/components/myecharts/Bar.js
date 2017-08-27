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
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            yAxis: {
                type: 'value'
            }
        };
    }
}

Bar.propTypes = {
};

export default Bar;