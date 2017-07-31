'use strict';

/*
 * SingleAccountCatPanel
 *
 * Panel for single account category
 */
import React, { Component, PropTypes } from 'React';
import { Card, Collapse } from 'antd';
import EditableSchemaHeader from '../base/EditableSchemaHeader';

const Panel = Collapse.Panel;

const createTitle = (item, onDelete, onUpdate, onAdd) => (
    <EditableSchemaHeader item={ item } onAdd={ onAdd } onDelete={ onDelete } onUpdate={ onUpdate } />
);

class SingleAccountCatPanel extends Component {
    render() {
        const { cat, addAccountCategory, deleteAccountCategory, updateAccountCategory } = this.props;
        const { items } = cat;
        
        return (
            <Card title={ createTitle(cat, deleteAccountCategory, updateAccountCategory, id => addAccountCategory(cat._id, id)) } >
                {
                    (items && items.length > 0) ?
                        (
                            <Collapse bordered={ false } defaultActiveKey={ items[0] ? [items[0]._id] : ['']}>
                                {
                                    items.map((item, index) => (
                                        <Panel key={ item._id }
                                               header={ createTitle(
                                                            item,
                                                            id => deleteAccountCategory(cat._id, id),
                                                            id => updateAccountCategory(cat._id, id)
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

SingleAccountCatPanel.propTypes = {
    cat: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        items: PropTypes.array
    }),
    addAccountCategory: PropTypes.func.isRequired,
    deleteAccountCategory: PropTypes.func.isRequired,
    updateAccountCategory: PropTypes.func.isRequired
};

export default SingleAccountCatPanel;