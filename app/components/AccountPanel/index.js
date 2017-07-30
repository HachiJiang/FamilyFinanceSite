'use strict';

/*
 * AccountPanel
 *
 * List and manage accounts
 */
import _ from 'lodash';
import React, { Component, PropTypes } from 'React';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class AccountPanel extends Component {
    render() {
        return (
            <Tabs
                defaultActiveKey='1'
                tabPosition='left'
            >
                {
                    this.props.accountCategories.map((cat, index) => (
                        <TabPane tab={ cat.name } key={ index }>

                        </TabPane>
                    ))
                }
            </Tabs>
        )
    }
}

AccountPanel.propTypes = {
    accountCategories: PropTypes.array.isRequired
};

export default AccountPanel;