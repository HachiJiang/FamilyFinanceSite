/*
 * Cascader
 *
 */
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import MenuItem from '../MenuItem';
import MenuItem2 from '../MenuItem2';
import AddItemForm from '../AddItemForm';

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
                <span>{ title && <label>{ `${title  }: ` }</label> }</span>
                <span className="pulldown-levelSelect">
                    <div
                        className="menu-item selected" ref="levelSelected"
                        onClick={ _ => this.setState({ expanded: !this.state.expanded })}>
                        <span className='selected-content'>{ value || DEFAULT_VALUE }</span>
                        <span className="fa fa-caret-down" aria-hidden="true"></span>
                    </div>
                    <div className={ menuCls }>
                        {
                            items && items.map((cat, index) => cat.items ? (
                                <MenuItem2
                                    key={ index }
                                    title={ cat.name }
                                    items={ cat.items }
                                    onSelectionChange={ itemName => {
                                        this.setState({
                                            expanded: false
                                        });
                                        onSelectionChange(itemName);
                                    } }
                                >
                                    <AddItemForm onSubmit={ value => addItem(value, cat._id) } />
                                </MenuItem2>
                            ) : (
                                <MenuItem
                                    key={ index }
                                    title={ cat.name }
                                    onSelectionChange={ title => onSelectionChange(title) }
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
    value: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func,
    onSelectionChange: PropTypes.func,
    addItem: PropTypes.func
};

export default Pulldown2;