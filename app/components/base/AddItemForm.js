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

    onSubmit(e) {
        e.preventDefault();
        const value = this.state.value;
        if (value) {
            this.props.onSubmit(value);
            this.setState({ value: '' });
        }
    }

    render() {
        return (
            <MenuItem2 title="[新增...]" className="addItem-form" onMouseLeave={ e => this.setState({ value: '' }) }>
                <form onSubmit={ e => this.onSubmit(e) }>
                    <input type="text"
                           placeholder="[输入类别...]"
                           value={ this.state.value }
                           onClick={ e => e.stopPropagation }
                           onChange={ e => this.onValueChange(e.target.value) }
                        />
                    <button type="submit" className="saveBtn btn">[确定]</button>
                </form>
            </MenuItem2>
        );
    }
}

AddItemForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddItemForm;