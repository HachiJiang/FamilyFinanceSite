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

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

function onKeyDown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
}

const App = ({ children }) => (
    <Layout className="layout">
        <NavBar />
        <Content style={{ padding: '0 50px', margin: '24px 16px 0' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                { children }
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Finance App ©2017 Created by Swordarchor
        </Footer>
    </Layout>
);

App.propTypes = {
    children: PropTypes.node
};

export default App;

