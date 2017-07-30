/**
 * Nav Link component
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavLink = props => (
    <Link
        activeClassName='selected'
        to={ props.to } >
        { props.children }
    </Link>
);

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default NavLink;