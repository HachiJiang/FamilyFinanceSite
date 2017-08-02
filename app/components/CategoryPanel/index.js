'use strict';

/*
 * CategoryPanel
 *
 * List and manage accounts
 */
import React, { Component, PropTypes } from 'React';

import { Tabs, Button } from 'antd';
import SingleCatPanel from '../base/SingleCatPanel';
import AddItemPopup from '../base/PopupInputForm';

const TabPane = Tabs.TabPane;

/**
 * Create header for TabPane
 * @param {String} name
 * @param {number} balance
 */
const TabPaneHeader = ({ name, balance }) => (
    <div>
        { name }
        { balance && <div>#余额#</div> }
    </div>
);

TabPaneHeader.propTypes = {
    name: PropTypes.string.isRequired,
    balance: PropTypes.number
};

const CategoryPanel = ({ categories, addCategory, deleteCategory, updateCategory }) => (
    <div className='category-panel'>
        <AddItemPopup onConfirm={ value => addCategory(value) }>
            <Button style={{ marginLeft: 20, marginBottom: 16 }} onClick={ e => e.stopPropagation() }>ADD</Button>
        </AddItemPopup>
        <Tabs tabPosition='left'
              defaultActiveKey={ (categories && categories.length > 0) ? categories[0]._id : '' }
        >
            {
                categories && categories.map((cat, index) => (
                    <TabPane
                        key={ cat._id }
                        tab={ <TabPaneHeader name={ cat.name }/> }
                    >
                        <SingleCatPanel
                            cat={ cat }
                            addItem={ addCategory }
                            deleteItem={ deleteCategory }
                            updateItem={ updateCategory }
                        />
                    </TabPane>
                ))
            }
        </Tabs>
    </div>
);

CategoryPanel.propTypes = {
    categories: PropTypes.array.isRequired,
    addCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired
};

export default CategoryPanel;