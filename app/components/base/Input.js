/*
 * Input
 *
 */
import React, { PropTypes } from 'react';

const Input = ({ value, title, type, placeholder, onChange }) => (
    <form className="input">
        <span>{ title }</span>
        <input type="text"
               placeholder={ placeholder }
               value={ value }
               type={ type }
               onChange={ e => onChange(e.target.value) }
            />
    </form>
);

Input.propTypes = {
    value: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default Input;