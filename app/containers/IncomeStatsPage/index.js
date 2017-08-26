'use strict';

/*
 * IncomeStatsPage
 *
 * Dashboards for income stats
 *
 */
import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { CHART_HEIGHT } from '../../constants/Config';

// Components
import { Cascader, Row, Col } from 'antd';
import Pie from '../../components/myecharts/Pie';
import Line from '../../components/myecharts/Line';

// Actions
import * as CategoryIncomeActionCreators from '../../actions/schema/income';
import * as MemberActionCreators from '../../actions/schema/member';
import * as IncomeStatsActionCreators from '../../actions/incomeStatsPage';

// Selectors
import { getData } from './selectors';

// Utils
import { getOptionsForAmountByDate, getOptionsForAmountByCat, getOptionsForAmountByMember } from './../../utils/chartUtils';

/**
 * Get options for line chart of members
 * @param {Array} amountByDateAndMember
 * @returns {Object}
 */
const getOptionsForAmountLineOfMembers = amountByDateAndMember => {
    const series = _.map(amountByDateAndMember, data => ({
        name: data.name,
        type: 'line',
        label: {
            normal: {
                show: true
            }
        },
        data: data.items,
        markLine: {
            data: [
                { type: 'average', name: '平均值' }
            ]
        }
    }));

    return {
        title: {
            text: '成员 - 总收入曲线'
        },
        legend: {
            data: _.map(amountByDateAndMember, item => item.name)
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _.map(amountByDateAndMember[0] && amountByDateAndMember[0].items, item => item.name)
        },
        series
    };
};

class IncomeStatsPage extends Component {

    componentDidMount() {
        const { dispatch, year } = this.props;
        CategoryIncomeActionCreators.fetchCategories(dispatch);    // 请求收入类别信息
        MemberActionCreators.fetchMembers(dispatch);               // 请求Member信息
        IncomeStatsActionCreators.fetchData(dispatch, year);
    }

    render() {
        const { year, amountByCat, amountBySubcat, amountByMember, amountByDate, amountByDateAndMember, amountByCatAndMember } = this.props;

        return (
            <div className='income-stats-page'>
                <div className='section-panel'>
                    <div className='section-panel-header'>
                        <span>年份: </span>
                        <Cascader
                            placeholder="Select year"
                            />
                    </div>
                    <Line height={ CHART_HEIGHT } options={ getOptionsForAmountByDate('家庭 - 总收入曲线', amountByDate) } />
                    <Row type='flex' justify='space-around' align='middle'>
                        <Col span={12}>
                            <Pie height={ CHART_HEIGHT } options={ getOptionsForAmountByCat('家庭 - 类别总收入', amountByCat, amountBySubcat) } />
                        </Col>
                        <Col span={12}>
                            <Pie height={ CHART_HEIGHT } options={ getOptionsForAmountByMember('家庭 - 成员总收入', amountByMember) } />
                        </Col>
                    </Row>
                    <Line height={ CHART_HEIGHT } options={ getOptionsForAmountLineOfMembers(amountByDateAndMember) } />
                    <Row type='flex' justify='space-around' align='middle'>
                        {
                            _.map(amountByCatAndMember, (data, index) => (
                                <Col key={ index } span={ 24 / amountByCatAndMember.length }>
                                    <Pie height={ CHART_HEIGHT } options={ getOptionsForAmountByCat(`${data.name} - 类别总收入`, data.cats, data.subCats) } />
                                </Col>
                            ))
                        }
                    </Row>
                    <div>税前 家庭及成员职业收入曲线</div>
                </div>
            </div>
        );
    }
}

IncomeStatsPage.propTypes = {
    year: PropTypes.string,
    amountByCat: PropTypes.array.isRequired,
    amountBySubcat: PropTypes.array.isRequired,
    amountByMember: PropTypes.array.isRequired,
    amountByDate: PropTypes.object.isRequired,   // by year or by month
    amountByDateAndMember: PropTypes.array.isRequired,
    amountByCatAndMember: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    const data = getData(state);
    return {
        ...data
    };
};

export default connect(mapStateToProps)(IncomeStatsPage);