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

const subMenuItemKeys = ['profile', 'accounts', 'outcome', 'income', 'projects', 'members', 'debtors', 'budgets'];

const { SubMenu } = Menu;

/**
 * Get selected key based on location url
 * @returns {String}
 */
function getSelectedKey() {
    const { pathname } = document.location || {};
    const arr = pathname.split('/');
    return arr.length > 0 ? arr[arr.length - 1] : '';
}

const NavBar = () => {
    const selectedKey = getSelectedKey();
    const openKey = subMenuItemKeys.indexOf(selectedKey) !== -1 ? 'sub-5' : '';

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={[openKey]}
        >
            <Menu.Item key='summary'>
                <NavLink to='/summary'>
                    <Icon type="home" />
                    <FormattedMessage {...messages.home} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key='records'>
                <NavLink to='/records'>
                    <Icon type="calculator" />
                    <FormattedMessage {...messages.records} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key='incomeStats'>
                <NavLink to='/incomeStats'>
                    <Icon type="pay-circle-o" />
                    <FormattedMessage {...messages.incomeStats} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key='outcomeStats'>
                <NavLink to='/outcomeStats'>
                    <Icon type="pay-circle-o" />
                    <FormattedMessage {...messages.outcomeStats} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key='dashboards'>
                <NavLink to='/dashboards'>
                    <Icon type="line-chart" />
                    <FormattedMessage {...messages.dashboards} />
                </NavLink>
            </Menu.Item>
            <SubMenu
                key="sub-5"
                title={<span><Icon type="setting" />设置</span>}>
                <Menu.Item key='profile'>
                    <NavLink to='/profile'>
                        <Icon type="user" />
                        <FormattedMessage {...messages.profile} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='accounts'>
                    <NavLink to='/accounts'>
                        <Icon type="pie-chart" />
                        <FormattedMessage {...messages.accounts} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='outcome'>
                    <NavLink to='/outcome'>
                        <Icon type="tags-o" />
                        <FormattedMessage {...messages.outcome} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='income'>
                    <NavLink to='/income'>
                        <Icon type="tags-o" />
                        <FormattedMessage {...messages.income} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='projects'>
                    <NavLink to='/projects'>
                        <Icon type="tags-o" />
                        <FormattedMessage {...messages.project} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='members'>
                    <NavLink to='/members'>
                        <Icon type="team" />
                        <FormattedMessage {...messages.members} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='debtors'>
                    <NavLink to='/debtors'>
                        <Icon type="exception" />
                        <FormattedMessage {...messages.debtors} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='budgets'>
                    <NavLink to='/budgets'>
                        <Icon type="schedule" />
                        <FormattedMessage {...messages.budgets} />
                    </NavLink>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default NavBar;