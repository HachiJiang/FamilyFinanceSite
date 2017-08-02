'use strict';

/*
 * MenuItem
 *
 */
import React, { PropTypes } from 'react';

const MenuItem = ({ id, title, onSelectionChange }) => (
    <div className='menu-item' onClick={ () => onSelectionChange(id) }>{ title }</div>
);

MenuItem.propTypes = {
    id: PropTypes.string,  // only id never change for one schema item
    title: PropTypes.string.isRequired,
    onSelectionChange: PropTypes.func
};

export default MenuItem;