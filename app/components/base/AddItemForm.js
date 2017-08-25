/*
 * AddItemForm
 *
 */
import React, { Component, PropTypes } from 'react';

import { Form, Button, Input } from 'antd';
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
                <Form layout="inline" onSubmit={ e => this.onSubmit(e) }>
                    <Input
                        type="text"
                        placeholder="[输入类别...]"
                        value={ this.state.value }
                        onClick={ e => e.stopPropagation }
                        onChange={ e => this.onValueChange(e.target.value) }
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="saveBtn btn"
                        disabled={ !this.state.value }
                    >
                        确定
                    </Button>
                </Form>
            </MenuItem2>
        );
    }
}

AddItemForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddItemForm;