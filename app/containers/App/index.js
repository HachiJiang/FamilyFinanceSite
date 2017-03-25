/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';

const App = props => (
    <div className="container">
        <NavBar />
        <div className="main-content">
            { props.children }
        </div>
    </div>
);

App.propTypes = {
    children: PropTypes.node
};

export default App;

