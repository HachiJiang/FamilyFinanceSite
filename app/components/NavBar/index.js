/**
 *
 * NavBar.react.js
 *
 * A common navigation bar in home page
 */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import NavLink from '../base/NavLink';
import messages from './messages';

import { Menu, Icon } from 'antd';

const menuItemKeys = ['/home', '/records', '/dashboards', '/profile', '/accounts', '/categories', '/budgets'];

const { SubMenu } = Menu;

/**
 * Get selected index based on location url
 * @returns {number}
 */
function getSelectedIdx() {
    const { pathname } = document.location || {};
    return menuItemKeys.indexOf(pathname);
}

const NavBar = () => {
    const selectedIdx = getSelectedIdx();
    const selectedKey = selectedIdx !== -1 ? `${selectedIdx  }` : '0';
    const openKey = selectedIdx > 2 ? 'sub-3' : '';

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={[openKey]}
        >
            <Menu.Item key="0">
                <NavLink to="/">
                    <Icon type="home" />
                    <FormattedMessage {...messages.home} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink to="/records">
                    <Icon type="pay-circle-o" />
                    <FormattedMessage {...messages.records} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to="/dashboards">
                    <Icon type="line-chart" />
                    <FormattedMessage {...messages.dashboards} />
                </NavLink>
            </Menu.Item>
            <SubMenu
                key="sub-3"
                title={<span><Icon type="setting" />设置</span>}>
                <Menu.Item key="3">
                    <NavLink to="/profile">
                        <Icon type="user" />
                        <FormattedMessage {...messages.profile} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to="/accounts">
                        <Icon type="line-chart" />
                        <FormattedMessage {...messages.accounts} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                    <NavLink to="/categories">
                        <Icon type="line-chart" />
                        <FormattedMessage {...messages.categories} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="6">
                    <NavLink to="/budgets">
                        <Icon type="schedule" />
                        <FormattedMessage {...messages.budgets} />
                    </NavLink>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default NavBar;