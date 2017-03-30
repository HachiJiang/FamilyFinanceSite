/*
 * Pulldown2
 *
 * Pulldown with 2-level menu
 */
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import MenuItem from './MenuItem';
import MenuItem2 from './MenuItem2';
import AddItemForm from './AddItemForm';

export default class Pulldown2 extends Component {
    constructor(props) {
        super(props);

        this.state = { // local state
            expanded: false
        };
        this._listener = null;
    }

    componentDidMount() {
        this._listener = window.addEventListener('click', e => {
            if (this.refs.levelSelected && !this.refs.levelSelected.contains(e.target) && this.state.expanded) {
                this.setState({ expanded: false });
            }
        });
    }

    componentWillUnmount() {
        if (this._listener) {
            this._listener.remove();
        }
        this._listener = null;
    }

    render() {
        const { title, items, onSelectionChange, addSubCategory, children } = this.props;
        const menuCls = classNames('menu', {
            disabled: !this.state.expanded
        });

        return (
            <div className="pulldown">
                <span>{ title && <label>{ title }</label> }</span>
                <span className="pulldown-levelSelect">
                    <div className="menu-item selected" ref="levelSelected"
                            onClick={ _ => this.setState({ expanded: !this.state.expanded })}>
                        <span className='selected-content'>{ this.props.value }</span>
                        <span className="fa fa-caret-down" aria-hidden="true"></span>
                    </div>
                    <div className={ menuCls }>
                        {
                            items && items.map((cat, index) => {
                                return cat.items ? (
                                    <MenuItem2 key={ index }
                                               title={ cat.name }
                                               items={ cat.items }
                                               onSelectionChange={ itemName => {
                                                    this.setState({
                                                        expanded: false
                                                    });
                                                    onSelectionChange(itemName);
                                                } }
                                        >
                                        <AddItemForm onSubmit={ value => addSubCategory(value, [index]) } />
                                    </MenuItem2>
                                ) : (
                                    <MenuItem key={ index }
                                              title={ cat.name }
                                              onSelectionChange={ title => onSelectionChange(title) }
                                        />
                                )
                            })
                        }
                        { children }
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
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func,
    onSelectionChange: PropTypes.func,
    addSubCategory: PropTypes.func
};