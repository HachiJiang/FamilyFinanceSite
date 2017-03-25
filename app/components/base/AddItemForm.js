/*
 * AddItemForm
 *
 */
import React, { PropTypes } from 'react';

const AddItemForm = props => (
    <div className='menu-item add'>
        <span className="icon fa fa-plus-circle" aria-hidden="true">{ props.title }</span>
    </div>
);

AddItemForm.propTypes = {
    title: PropTypes.string.isRequired
};

export default AddItemForm;