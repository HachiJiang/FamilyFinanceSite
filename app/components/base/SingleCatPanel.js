'use strict';

/*
 * SingleCatPanel
 *
 * Panel for single category
 */
import React, { Component, PropTypes } from 'React';
import { Card, Collapse } from 'antd';
import EditableSchemaHeader from './EditableSchemaHeader';

const Panel = Collapse.Panel;

const createTitle = (item, onDelete, onUpdate, onAdd) => (
    <EditableSchemaHeader item={ item } onAdd={ onAdd } onDelete={ onDelete } onUpdate={ onUpdate } />
);

class SingleCatPanel extends Component {
    render() {
        const { cat, addItem, deleteItem, updateItem } = this.props;
        const { items } = cat;
        
        return (
            <Card title={ createTitle(
                                cat,
                                cat._id && deleteItem,
                                cat._id && (name => updateItem(name, cat._id)),
                                name => addItem(name, cat._id)
                            ) } >
                {
                    (items && items.length > 0) ?
                        (
                            <Collapse bordered={ false } defaultActiveKey={ items[0] ? [items[0]._id] : ['']}>
                                {
                                    items.map((item, index) => (
                                        <Panel key={ item._id }
                                               header={ createTitle(
                                                            item,
                                                            cat._id ? id => deleteItem(cat._id, id) : deleteItem,
                                                            cat._id ? name => updateItem(name, cat._id, item._id) : name => updateItem(name, item._id)
                                                        ) }>
                                            按事件倒序的流水记录
                                        </Panel>
                                    ))
                                }
                            </Collapse>
                        )
                        :
                        <span>尚未创建账户!</span>
                }
            </Card>
        )
    }
}

SingleCatPanel.propTypes = {
    cat: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired
    }),
    addItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired
};

export default SingleCatPanel;