'use strict';

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

import { Spin, Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function onKeyDown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
}

class App extends Component {
    state = {
        collapsed: false,
        loading: false
    };

    onCollapse(collapsed) {
        this.setState({ collapsed });
    }

    render() {
        return (
            <Spin spinning={ this.state.loading }>
                <Layout style={{ height: '100vh' }}>
                    <Sider id='main-sider'
                           breakpoint='lg'
                           collapsible
                           collapsed={this.state.collapsed}
                           onCollapse={ (collapsed, type) => this.onCollapse(collapsed) }
                           style={{ overflow: 'auto' }}
                        >
                        <div className="logo" />
                        <NavBar />
                    </Sider>
                    <Layout style={{ overflow: 'auto' }}>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            { this.props.children }
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Finance App ©2017 Created by Swordarchor
                        </Footer>
                    </Layout>
                </Layout>
            </Spin>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

export default App;

