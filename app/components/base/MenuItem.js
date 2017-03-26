/*
 * MenuItem
 *
 */
import React, { PropTypes } from 'react';

const MenuItem = props => (
    <div className='menu-item' onClick={ evt => props.onSelectionChange(props.title) }>{ props.title }</div>
);

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    onSelectionChange: PropTypes.func
};

export default MenuItem;