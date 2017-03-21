/**
 *
 * NavBar.react.js
 *
 * A common navigation bar in home page
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import NavLink from '../NavLink';
import messages from './messages';

import './scss/index.scss';

const NavBar = props => (
    <header className="nav">
        <ul className="nav-body">
            <li><NavLink to="/">
                <FormattedMessage {...messages.home} />
            </NavLink></li>
            <li><NavLink to="/records">
                <FormattedMessage {...messages.records} />
            </NavLink></li>
            <li><NavLink to="/budget">
                <FormattedMessage {...messages.budget} />
            </NavLink></li>
            <li><NavLink to="/dashboards">
                <FormattedMessage {...messages.dashboard} />
            </NavLink></li>
            <li><NavLink to="/account">
                <FormattedMessage {...messages.account} />
            </NavLink></li>
        </ul>
        <ul className="nav-footer">
            <li><NavLink to="/profile">
                <FormattedMessage {...messages.setting} />
            </NavLink></li>
        </ul>
    </header>
);

export default NavBar;