/*
 * AddItemForm
 *
 */
import React, { Component, PropTypes } from 'react';

import MenuItem2 from './MenuItem2';

class AddItemForm extends Component  {
    state = {
        value: ''
    };

    onValueChange(value) {
        this.setState({ value });
    }

    render() {
        return (
            <MenuItem2 title="[新增...]" className="input-form" onMouseLeave={ e => this.setState({ value: '' }) }>
                <input type="text"
                       placeholder="[输入类别...]"
                       value={ this.state.value }
                       onClick={ e => e.stopPropagation }
                       onChange={ e => this.onValueChange(e.target.value) }
                    />
                <button className="saveBtn btn">[确定]</button>
            </MenuItem2>
        );
    }
}

export default AddItemForm;