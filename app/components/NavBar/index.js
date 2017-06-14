/**
 *
 * NavBar.react.js
 *
 * A common navigation bar in home page
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import NavLink from '../base/NavLink';
import messages from './messages';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const NavBar = props => (
    <Header className="header">
        <div className="logo" />
        <Menu
            className="main-nav"
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
            >
            <Menu.Item key="1">
                <NavLink to="/">
                    <FormattedMessage {...messages.home} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to="/records">
                    <FormattedMessage {...messages.records} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
                <NavLink to="/budget">
                    <FormattedMessage {...messages.budget} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
                <NavLink to="/dashboards">
                    <FormattedMessage {...messages.dashboard} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
                <NavLink to="/profile">
                    <FormattedMessage {...messages.setting} />
                </NavLink>
            </Menu.Item>
        </Menu>
    </Header>
);

export default NavBar;