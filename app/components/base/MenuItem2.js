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
        const mainCls = this.props.className ? "menu-item2 " + this.props.className : "menu-item2";
        const menuCls = classNames("menu", {
            disabled: !this.state.active
        });
        return (
            <div className={ mainCls }
                 onClick={ e => {
                     e.stopPropagation(); // do not close the menu
                     showMenu.call(this);
                 } }
                 onMouseOver={ () => showMenu.call(this) }
                 onMouseLeave={ () => {
                    this.props.onMouseLeave && this.props.onMouseLeave();
                    hideMenu.call(this);
                 } }>
                <span className='menu-item-content'>{ this.props.title }</span>
                <span className='fa fa-caret-right' aria-hidden='true'></span>
                <div className={ menuCls }>
                    {
                        this.props.items && this.props.items.map((item, index) => (
                            <MenuItem key={ index }
                                      title={ item }
                                      onSelectionChange={ title => this.props.onSelectionChange(index, title) }/>
                        ))
                    }
                    {
                        this.props.children
                    }
                </div>
            </div>
        );
    }
}

MenuItem2.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    items: PropTypes.array,
    onSelectionChange: PropTypes.func,
    className: PropTypes.string
};

export default MenuItem2;