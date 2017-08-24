'use strict';

/*
 *
 * Utils for drawing chart to reuse options
 *
 */

/**
 * Get options for amountByDate pie chart
 * @param {String} name
 * @param {Object} amountByDate
 * @returns {Array}
 */
const getOptionsForAmountByDate = (name = '', amountByDate = {}) => ({
    title: {
        text: name
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: _.map(amountByDate, (item, key) => key)
    },
    series: [{
        name,
        type: 'line',
        data: _.toArray(amountByDate),
        label: {
            normal: {
                show: true
            }
        },
        markPoint: {
            data: [
                {type: 'min', name: '最小值'},
                {type: 'max', name: '最大值'}
            ],
            symbol: 'roundRect',
            symbolSize: [60, 30]
        },
        markLine: {
            data: [
                {type: 'average', name: '平均值'}
            ]
        }
    }]
});

/**
 * Get options for amountByCat pie chart
 * @param {String} name
 * @param {Array} amountByCat
 * @param {Array} amountBySubcat
 * @returns {Object}
 */
const getOptionsForAmountByCat = (name, amountByCat = [], amountBySubcat = []) => {
    const type = 'pie';

    return {
        title: {
            text: name,
            subtext: '[后续支持显示各类别流水]'
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
            data: _.map(amountBySubcat, item => ({
                    ...item,
                    label: {
                        normal: {
                            formatter: '{b}: {d}%'
                        }
                    }
                })
            )
        }]
    }
};

/**
 * Get options for amountByMember pie chart
 * @param {String} name
 * @param {Array} amountByMember
 * @returns {Object}}
 */
const getOptionsForAmountByMember = (name = '', amountByMember = []) => {
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
                            formatter: '{b}: {c}, {d}'
                        }
                    }
                })
            )
        }]
    };
};

export {
    getOptionsForAmountByDate,
    getOptionsForAmountByCat,
    getOptionsForAmountByMember
}
