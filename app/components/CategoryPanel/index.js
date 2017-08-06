'use strict';

/*
 * CategoryPanel
 *
 * List and manage accounts
 */
import _ from 'lodash';
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

class CategoryPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeKey: null
        }
    }

    componentWillReceiveProps(nextProps) {
        const { categories } = nextProps;
        const { activeKey } = this.state;

        // activeKey不存在或者对应的category不存在, 则重新赋默认值
        if (!activeKey || !_.filter(categories, cat => cat._id === activeKey)) {
            this.setState({
                activeKey: (categories && categories.length > 0) ? categories[0]._id : ''
            });
        }
    }

    render() {
        const { categories, addCategory, deleteCategory, updateCategory } = this.props;

        return (
            <div className='category-panel'>
                <AddItemPopup onConfirm={ value => addCategory(value) }>
                    <Button style={{ marginLeft: 20, marginBottom: 16 }} onClick={ e => e.stopPropagation() }>ADD</Button>
                </AddItemPopup>
                <Tabs tabPosition='left'
                      activeKey={ this.state.activeKey }
                      onChange={ key => this.setState({ activeKey: key }) }
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
    }
}

CategoryPanel.propTypes = {
    categories: PropTypes.array.isRequired,
    addCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired
};

export default CategoryPanel;