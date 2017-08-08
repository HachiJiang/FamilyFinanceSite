'use strict';

/*
 * Cascader, only for schema
 *
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import MenuItem from '../MenuItem';
import MenuItem2 from '../MenuItem2';
import AddItemForm from '../AddItemForm';

import { idStrToName } from '../../../utils/recordUtils';

import './style/_index.scss';

const DEFAULT_VALUE = '[请选择...]';

class Pulldown2 extends Component {
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
        const { title, value, items, onSelectionChange, addItem } = this.props;
        const menuCls = classNames('menu', {
            disabled: !this.state.expanded
        });

        return (
            <div className="form">
                <span>{ title && <label>{ `${title}: ` }</label> }</span>
                <span className="pulldown-levelSelect">
                    <div
                        className="menu-item selected" ref="levelSelected"
                        onClick={ () => this.setState({ expanded: !this.state.expanded })}>
                        <span className='selected-content'>{ value ? idStrToName(value, items) : DEFAULT_VALUE }</span>
                        <span className="fa fa-caret-down" aria-hidden="true"></span>
                    </div>
                    <div className={ menuCls }>
                        {
                            items && items.map((cat, index) => cat.items ? (
                                <MenuItem2
                                    key={ index }
                                    id={ cat._id }
                                    title={ cat.name }
                                    items={ cat.items }
                                    onSelectionChange={ itemId => {
                                        this.setState({
                                            expanded: false
                                        });
                                        onSelectionChange(cat._id, itemId);
                                    } }
                                >
                                    <AddItemForm onSubmit={ value => addItem(value, cat._id) } />
                                </MenuItem2>
                            ) : (
                                <MenuItem
                                    key={ index }
                                    id={ cat._id }
                                    title={ cat.name }
                                    onSelectionChange={ id => onSelectionChange(id) }
                                />
                            ))
                        }
                        <AddItemForm onSubmit={ addItem }/>
                    </div>
                </span>
            </div>
        );
    }
}

Pulldown2.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string, // id string
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectionChange: PropTypes.func,
    addItem: PropTypes.func
};

export default Pulldown2;