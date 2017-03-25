/*
 * MenuItem
 *
 */
import React, { PropTypes } from 'react';

const MenuItem = props => (
    <div className='menu-item'>{ props.title }</div>
);

MenuItem.propTypes = {
    title: PropTypes.string.isRequired
};

export default MenuItem;