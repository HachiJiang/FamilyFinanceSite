'use strict';

/*
 *
 * Abstract super class for components using echarts
 *
 */
import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import echarts from 'echarts';

import { addEvent, removeEvent } from '../../utils/eventUtils';

class BaseEchart extends Component {

    constructor(props) {
        super(props);

        this._resizeHandler = () => this.resize(); // bind "this", store for disposing
        this.defaultOptions = {};
    }

    initChart() {
        const { options = {} } = this.props;
        const defaultOptions = _.cloneDeep(this.defaultOptions || {}); // copy to avoid changes
        const chartDom = this.chartDom;

        if (!chartDom) {
            return;
        }

        let myChart = this.myChart;
        if (!myChart) {
            myChart = this.myChart = echarts.init(chartDom);
            addEvent(window, 'resize', this._resizeHandler);
        }

        myChart.setOption(_.assign(defaultOptions, options));
    }

    resize() {
        let myChart = this.myChart;
        if (myChart) {
            myChart.resize();
        }
    }

    componentDidMount() {
        this.initChart();
    }

    componentDidUpdate() {
        this.initChart();
    }

    componentWillUnmount() {
        const myChart = this.myChart;
        if (myChart) {
            removeEvent(window, 'resize', this._resizeHandler);  // memory leak?
            myChart.dispose();
        }
    }

    render() {
        const { width = "100%", height = "100%" } = this.props;
        return <div ref={ chartDom => this.chartDom = chartDom } style={ { width, height } }></div>
    }
}

BaseEchart.propTypes = {
    options: PropTypes.object.isRequired,
    width: PropTypes.string,
    height: PropTypes.string
};

export default BaseEchart;