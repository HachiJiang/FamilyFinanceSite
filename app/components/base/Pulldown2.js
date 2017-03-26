/*
 * Pulldown2
 *
 * Pulldown with 2-level menu
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import MenuItem2 from './MenuItem2';
import AddItemForm from './AddItemForm';

export default class Pulldown2 extends Component {
    constructor(props) {
        super(props);

        const { value, items } = this.props;
        this.state = { // local state
            value: value || (items && items[0].items[0]),
            expanded: false
        };
        this._listener = null;
    }

    componentDidMount() {
        this._listener = window.addEventListener('click', evt => this.setState({ expanded: false }));
    }

    componentWillUnmount() {
        if (this._listener) this._listener.remove();
    }

    render() {
        const { title, items } = this.props;
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
                        <span className='selected-content'>{ this.state.value }</span>
                        <span className="fa fa-caret-down" aria-hidden="true"></span>
                    </div>
                    <div className={ menuCls }>
                        {
                            items && items.map((cat, index) => (
                                <MenuItem2 key={index}
                                           title={cat.name}
                                           items={cat.items}
                                           onSelectionChange={ (selected, itemName) => {
                                                this.setState({
                                                    value: itemName,
                                                    expanded: false
                                                });
                                                this.props.onSelectionChange([index, selected]);
                                            } }>
                                    <AddItemForm />
                                </MenuItem2>
                            ))
                        }
                        {
                            this.props.children
                        }
                    </div>
                </span>
            </div>
        );
    }
}

Pulldown2.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    value: PropTypes.string,
    items: PropTypes.array,
    onClick: PropTypes.func
};