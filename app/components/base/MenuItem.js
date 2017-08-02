/*
 * MenuItem
 *
 */
import React, { PropTypes } from 'react';

const MenuItem = ({ id, title, onSelectionChange }) => (
    <div className='menu-item' onClick={ e => onSelectionChange(title, id) }>{ title }</div>
);

MenuItem.propTypes = {
    id: PropTypes.string.isRequired,  // only id never change for one schema item
    title: PropTypes.string.isRequired,
    onSelectionChange: PropTypes.func
};

export default MenuItem;