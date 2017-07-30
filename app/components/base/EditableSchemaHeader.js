'use strict';

/*
 * EditableSchemaHeader
 *
 * create | edit | delete
 *
 */
import React, { Component, PropTypes } from 'react';
import { Popconfirm, message, Icon, Input } from 'antd';

const stopPropagation = e => e.stopPropagation();

class EditableSchemaHeader extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.item.name,
            editable: false
        };
    }

    check() {
        const { onUpdate } = this.props;
        this.setState({ editable: false });
        onUpdate(this.state.value);
    }

    edit() {
        this.setState({ editable: true });
    }

    confirmAdd() {
        message.success('新增成功');
    }

    confirmDelete() {
        const { onDelete, item: { _id } } = this.props;
        onDelete(_id);
    }

    render() {
        const { value, editable } = this.state;
        const { needAdd = false } = this.props;

        return (
            <div className='editable-schema-header'>
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input value={ value }
                                   onChange={ e => this.setState({ value: e.target.value }) }
                                   onPressEnter={ () => this.check() }
                                />
                            <Icon type="check"
                                  className="editable-cell-icon"
                                  onClick={ () => this.check() }
                                />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            { value || ' ' }
                            <Icon type="edit"
                                  className="editable-cell-icon"
                                  onClick={ () => this.edit() }
                                />
                        </div>
                }
                <span>#余额: #</span>
                <span style={ {float: 'right'} }>
                    {
                        needAdd &&
                        <span>
                            <Popconfirm title='确定新增么?'
                                        onConfirm={ () => this.confirmAdd() }
                                        onCancel={ () => { message.error('取消新增') } }>
                                <a href="#" onClick={ stopPropagation }>新增</a>
                            </Popconfirm>
                            <span className="ant-divider" />
                        </span>
                    }
                    <Popconfirm title='确定删除么?'
                                onConfirm={ () => this.confirmDelete() }
                                onCancel={ () => { message.error('取消删除') } }>
                        <a href="#" onClick={ stopPropagation }>删除</a>
                    </Popconfirm>
                </span>
            </div>
        );
    }
}

EditableSchemaHeader.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    needAdd: PropTypes.boolean,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default EditableSchemaHeader;