/*
 * Input
 *
 */
import React, { PropTypes } from 'react';

const Input = ({ value, title, type, placeholder, onChange }) => (
    <form className="input">
        <span>{ title }</span>
        <input type={ type }
               placeholder={ placeholder }
               value={ value }
               onChange={ e => onChange(e.target.value) }
            />
    </form>
);

Input.propTypes = {
    value: PropTypes.any,
    title: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default Input;