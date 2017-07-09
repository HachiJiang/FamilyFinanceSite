/**
 * Nav Link component
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

const NavLink = props => (
    <Link activeClassName='selected'
          to={ props.to } >
        { props.children }
    </Link>
);

export default NavLink;