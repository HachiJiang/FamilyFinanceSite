'use strict';

/*
 * SalaryPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const SalaryPage = props => (
    <div>
        <div>年份 filter</div>
        <div>各家庭成员职业收入合计/总收入合计 按年曲线图 一个报表</div>
        <div>总收入合计 不可编辑表格</div>
        <div>各家庭成员职业收入 可编辑表格</div>
    </div>
);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SalaryPage);