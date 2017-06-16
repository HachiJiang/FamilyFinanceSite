/*
 * Input
 *
 */
import React, { PropTypes } from 'react';

const Input = ({ title, children }) => (
    <form className="form">
        <span>{ title }</span>
        { children }
    </form>
);

Input.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};

export default Input;