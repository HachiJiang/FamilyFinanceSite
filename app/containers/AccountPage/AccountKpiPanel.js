'use strict';

/*
 *
 * Account KPI Panel
 *
 */

import React, { PropTypes, Component } from 'react';
import { Row, Col } from 'antd';
import echarts from 'echarts';

class AccountKpiPanel extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Row className="account-kpi" type="flex" justify="space-around" align="middle">
                <Col span={3}>
                    <div>总资产</div>
                </Col>
                <Col span={9}><div>col-4</div></Col>
            </Row>
        );
    }
}

AccountKpiPanel.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountKpiPanel;