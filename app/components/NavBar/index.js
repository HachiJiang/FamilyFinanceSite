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

const menuItemPaths = ['/', '/records', '/salaries', '/dashboards', '/profile', '/accounts', '/outcome', '/income', '/projects', '/members', '/debtors', '/budgets'];

const { SubMenu } = Menu;

/**
 * Get selected index based on location url
 * @returns {number}
 */
function getSelectedIdx() {
    const { pathname } = document.location || {};
    return menuItemPaths.indexOf(pathname);
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
                <NavLink to={ menuItemPaths[0] }>
                    <Icon type="home" />
                    <FormattedMessage {...messages.home} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink to={ menuItemPaths[1] }>
                    <Icon type="calculator" />
                    <FormattedMessage {...messages.records} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to={ menuItemPaths[2] }>
                    <Icon type="pay-circle-o" />
                    <FormattedMessage {...messages.salaries} />
                </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
                <NavLink to={ menuItemPaths[3] }>
                    <Icon type="line-chart" />
                    <FormattedMessage {...messages.dashboards} />
                </NavLink>
            </Menu.Item>
            <SubMenu
                key="sub-4"
                title={<span><Icon type="setting" />设置</span>}>
                <Menu.Item key="4">
                    <NavLink to={ menuItemPaths[4] }>
                        <Icon type="user" />
                        <FormattedMessage {...messages.profile} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                    <NavLink to={ menuItemPaths[5] }>
                        <Icon type="pie-chart" />
                        <FormattedMessage {...messages.accounts} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="6">
                    <NavLink to={ menuItemPaths[6] }>
                        <Icon type="tags-o" />
                        <FormattedMessage {...messages.outcome} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="7">
                    <NavLink to={ menuItemPaths[7] }>
                        <Icon type="tags-o" />
                        <FormattedMessage {...messages.income} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="8">
                    <NavLink to={ menuItemPaths[8] }>
                        <Icon type="tags-o" />
                        <FormattedMessage {...messages.project} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="9">
                    <NavLink to={ menuItemPaths[9] }>
                        <Icon type="team" />
                        <FormattedMessage {...messages.members} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="10">
                    <NavLink to={ menuItemPaths[10] }>
                        <Icon type="exception" />
                        <FormattedMessage {...messages.debtors} />
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="11">
                    <NavLink to={ menuItemPaths[11] }>
                        <Icon type="schedule" />
                        <FormattedMessage {...messages.budgets} />
                    </NavLink>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default NavBar;