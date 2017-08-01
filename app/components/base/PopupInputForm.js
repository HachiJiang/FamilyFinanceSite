'use strict';

/*
 * PopupInputForm
 *
 * Popup to add item
 */
import React, { Component, PropTypes } from 'React';
import { Popconfirm, message, Input } from 'antd';

class PopupInputForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    reset() {
        this.setState({ value: '' });
    }

    onSubmit() {
        const { value } = this.state;
        const { onConfirm } = this.props;

        if (value) {
            onConfirm(value);
            this.reset();
        } else {
            message.warning('无效输入!');
        }
    }

    render() {
        const { children } = this.props;

        return (
            <Popconfirm title={ <Input placeholder='Please type name...'
                                       value={ this.state.value }
                                       onChange={ ({ target: { value } }) => this.setState({ value }) }/> }
                        onPressEnter={ e => this.onSubmit() }
                        onConfirm={ e => this.onSubmit() }
                        onCancel={ () => message.error('取消新增') }
                        onVisibleChange={ () => this.reset() }
                >
                { children }
            </Popconfirm>
        );
    }
}

PopupInputForm.propTypes = {
    value: PropTypes.string,
    children: PropTypes.node,
    onConfirm: PropTypes.func.isRequired
};

export default PopupInputForm;