/*
 * MenuItem2
 *
 * Menu item with two level menu
 *
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import MenuItem from './MenuItem';

function showMenu() {
    this.setState({ active: true });
}

function hideMenu() {
    this.setState({ active: false });
}

class MenuItem2 extends Component {
    state = {
        active: false
    };

    render() {
        const { items, onSelectionChange, onMouseLeave, children, className } = this.props;
        const mainCls = className ? `menu-item2 ${  className}` : "menu-item2";
        const menuCls = classNames("menu", {
            disabled: !this.state.active
        });

        return (
            <div
                className={ mainCls }
                onClick={ e => e.stopPropagation() /* do not close the menu */ }
                onMouseOver={ () => showMenu.call(this) }
                onMouseLeave={ () => {
                    onMouseLeave && onMouseLeave();
                    hideMenu.call(this);
                } }>
                <span className='menu-item-content'>{ this.props.title }</span>
                <span className='fa fa-caret-right' aria-hidden='true'></span>
                <div className={ menuCls }>
                    {
                        items && items.map((item, index) => (
                            <MenuItem
                                key={ index }
                                id={ item._id }
                                title={ item.name }
                                onSelectionChange={ (title, id) => onSelectionChange(title, id) }
                            />
                        ))
                    }
                    { children }
                </div>
            </div>
        );
    }
}

MenuItem2.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    items: PropTypes.array,
    onMouseLeave: PropTypes.func,
    onSelectionChange: PropTypes.func,
    className: PropTypes.string
};

export default MenuItem2;