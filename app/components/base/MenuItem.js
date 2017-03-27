/*
 * MenuItem
 *
 */
import React, { PropTypes } from 'react';

const MenuItem = ({ title, onSelectionChange }) => (
    <div className='menu-item' onClick={ evt => onSelectionChange(title) }>{ title }</div>
);

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    onSelectionChange: PropTypes.func
};

export default MenuItem;