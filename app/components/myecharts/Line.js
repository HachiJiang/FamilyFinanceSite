'use strict';

/*
 *
 * Line chart using echarts
 *
 */

import React, { PropTypes } from 'react';
import BaseEchart from './BaseEchart';
import 'echarts/lib/chart/line';

class Line extends BaseEchart {
    constructor(props) {
        super(props);

        this.defaultOptions = {
            tooltip: {
                trigger: 'axis'
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

Line.propTypes = {
};

export default Line;