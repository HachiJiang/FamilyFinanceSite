/*
 * Pulldown2
 *
 * Pulldown with 2-level menu
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import AddItemForm from './AddItemForm';

export default class Pulldown extends Component {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.string,
        children: PropTypes.node
    };

    _listener = null;

    state = { // local state
        value: this.props.value,
        expanded: false
    };

    componentDidMount() {
        this._listener = window.addEventListener('click', evt => this.setState({ expanded: false }));
    }

    componentWillUnmount() {
        if (this._listener) this._listener.remove();
    }

    render() {
        const { title, value, children } = this.props;
        const menuCls = classNames('menu', {
            disabled: !this.state.expanded
        });
        return (
            <div className='pulldown'>
                <span>{ title && <label>{ title }</label> }</span>
                <span className='pulldown-levelSelect'>
                    <div className='menu-item selected'
                            onClick={ evt => {
                                evt.stopPropagation();
                                this.setState({ expanded: !this.state.expanded })
                            }}>
                        <span className='selected-content'>{ value }</span>
                        <span className="fa fa-caret-down" aria-hidden="true"></span>
                    </div>
                    <div className={ menuCls }>
                        { children }
                        <AddItemForm title='[新增一级分类]...' />
                    </div>
                </span>
            </div>
        );
    }
}