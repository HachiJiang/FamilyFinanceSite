'use strict';

/*
 * EditableSchemaHeader
 *
 * create | edit | delete
 *
 * If the input item doesn't have _id, the item cannot be edit or delete.
 *
 */
import React, { Component, PropTypes } from 'react';
import { Popconfirm, message, Icon, Input } from 'antd';
import AddItemPopup from './PopupInputForm';

import { DECIMAL_PRECISION } from '../../constants/Config';

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

    confirmDelete() {
        const { onDelete, item: { _id } } = this.props;
        onDelete(_id);
    }

    render() {
        const { value, editable } = this.state;
        const { onAdd, item: { _id, balance } } = this.props;

        return (
            <div className='editable-schema-header'>
                {
                    _id ?
                        (editable ?
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
                            </div>)
                        :
                        <div>{ value }</div>
                }
                { balance && <span>{ balance.toFixed(DECIMAL_PRECISION) } (RMB)</span> }
                <span style={ {float: 'right'} }>
                    {
                        onAdd &&
                        <AddItemPopup onConfirm={ onAdd }>
                            <a href="#" onClick={ stopPropagation }>add</a>
                        </AddItemPopup>
                    }
                    { onAdd && _id && <span className="ant-divider" /> }
                    {
                        _id &&
                        <Popconfirm title='确定删除么?'
                                           onConfirm={ () => this.confirmDelete() }
                                           onCancel={ () => { message.error('取消删除') } }>
                            <a href="#" onClick={ stopPropagation }>delete</a>
                        </Popconfirm>
                    }
                </span>
            </div>
        );
    }
}

EditableSchemaHeader.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        balance: PropTypes.number
    }),
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
};

export default EditableSchemaHeader;