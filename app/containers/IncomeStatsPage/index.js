'use strict';

/*
 * IncomeStatsPage
 *
 * Dashboards for income stats
 *
 */
import moment from 'moment';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { Cascader, Row, Col } from 'antd';
import Pie from '../../components/myecharts/Pie';
import Line from '../../components/myecharts/Line';

import { getData } from './selectors';
import * as CategoryIncomeActionCreators from '../../actions/schema/income';
import * as MemberActionCreators from '../../actions/schema/member';
import * as IncomeStatsActionCreators from '../../actions/incomeStatsPage';
import { getOptionsForAmountByDate, getOptionsForAmountByCat, getOptionsForAmountByMember } from './../../utils/chartUtils';

const CHART_HEIGHT = '300px';

class IncomeStatsPage extends Component {

    componentDidMount() {
        const { dispatch, year } = this.props;
        CategoryIncomeActionCreators.fetchCategories(dispatch);    // 请求收入类别信息
        MemberActionCreators.fetchMembers(dispatch);               // 请求Member信息
        IncomeStatsActionCreators.fetchData(dispatch, year);
    }

    render() {
        const { year, amountByCat, amountBySubcat, amountByMember, amountByDate } = this.props;

        return (
            <div className='income-stats-page'>
                <div className='section-panel'>
                    <div className='section-panel-header'>
                        <span>年份: </span>
                        <Cascader
                            placeholder="Select year"
                            />
                    </div>
                    <Line height={ CHART_HEIGHT } options={ getOptionsForAmountByDate('家庭总收入曲线', amountByDate) } />
                    <Row type='flex' justify='space-around' align='middle'>
                        <Col span={12}>
                            <Pie height={ CHART_HEIGHT } options={ getOptionsForAmountByCat('类别总收入', amountByCat, amountBySubcat) } />
                        </Col>
                        <Col span={12}>
                            <Pie height={ CHART_HEIGHT } options={ getOptionsForAmountByMember('成员总收入', amountByMember) } />
                        </Col>
                    </Row>
                    <div>税前税后 家庭及成员职业收入曲线</div>
                    <div>税前税后 家庭及成员职业收入及奖金比例</div>
                </div>
            </div>
        );
    }
}

IncomeStatsPage.propTypes = {
    year: PropTypes.number,
    amountByCat: PropTypes.array.isRequired,
    amountBySubcat: PropTypes.array.isRequired,
    amountByMember: PropTypes.array.isRequired,
    amountByDate: PropTypes.array.isRequired   // by year or by month
};

const mapStateToProps = state => {
    const data = getData(state);
    return {
        ...data
    };
};

export default connect(mapStateToProps)(IncomeStatsPage);