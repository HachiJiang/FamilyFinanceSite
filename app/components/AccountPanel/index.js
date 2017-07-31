'use strict';

/*
 * AccountPanel
 *
 * List and manage accounts
 */
import _ from 'lodash';
import React, { Component, PropTypes } from 'React';

import { Tabs, Button } from 'antd';
import SingleAccountCatPanel from './SingleAccountCatPanel';
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
        <div>#余额#</div>
    </div>
);

TabPaneHeader.propTypes = {
    name: PropTypes.string.isRequired,
    balance: PropTypes.number
};

const AccountPanel = ({ accountCategories, addAccountCategory, deleteAccountCategory, updateAccountCategory }) =>
    accountCategories.length > 0 ?
    (
        <div>
            <AddItemPopup onConfirm={ value => addAccountCategory(value) }>
                <Button style={{ marginLeft: 50, marginBottom: 16 }} onClick={ e => e.stopPropagation() }>ADD</Button>
            </AddItemPopup>
            <Tabs tabPosition='left'
                  defaultActiveKey={ accountCategories[0]._id }
                >
                {
                    accountCategories.map((cat, index) => (
                        <TabPane
                            key={ cat._id }
                            tab={ <TabPaneHeader name={ cat.name }/> }
                            >
                            <SingleAccountCatPanel
                                cat={ cat }
                                addAccountCategory={ addAccountCategory }
                                deleteAccountCategory={ deleteAccountCategory }
                                updateAccountCategory={ updateAccountCategory }
                                />
                        </TabPane>
                    ))
                }
            </Tabs>
        </div>
    )
    :
    (
        <span>尚未创建账户!</span>
    );

AccountPanel.propTypes = {
    accountCategories: PropTypes.array.isRequired,
    addAccountCategory: PropTypes.func.isRequired,
    deleteAccountCategory: PropTypes.func.isRequired,
    updateAccountCategory: PropTypes.func.isRequired
};

export default AccountPanel;