'use strict';

/*
 *
 * Pie chart using echarts
 *
 */

import React from 'react';
import BaseEchart from './BaseEchart';

class Pie extends BaseEchart {
    constructor(props) {
        super(props);

        this.defaultOptions = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            }
        };
    }
}

Pie.propTypes = {
};

export default Pie;