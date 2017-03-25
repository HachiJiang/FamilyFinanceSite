/*
 * MenuItem2
 *
 * Menu item with two level menu
 *
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import MenuItem from './MenuItem';
import AddItemForm from './AddItemForm';

class MenuItem2 extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        activeIndex: PropTypes.number
    };

    state = {
        active: false
    };

    render() {
        const { title, items } = this.props;
        const menuCls = classNames('menu', {
            disabled: !this.state.active
        });
        return (
            <div className='menu-item menu-item2'
                 onMouseOver={ evt => this.setState({ active:true }) }
                 onMouseLeave={ evt => this.setState({ active:false }) }>
                <span className='menu-item-content'>{ title }</span>
                <span className='fa fa-caret-right' aria-hidden='true'></span>
                <div className={ menuCls }>
                    {
                        items.map((item, index) => (
                            <MenuItem key={ index } title={ item } />
                        ))
                    }
                    <AddItemForm title='[新增二级分类]...' />
                </div>
            </div>
        );
    }
}

export default MenuItem2;