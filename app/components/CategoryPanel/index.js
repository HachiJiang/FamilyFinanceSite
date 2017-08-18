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
 * @param {String} extraInfo
 */
const TabPaneHeader = ({ name, extraInfo }) => (
    <div>
        { name }
        { extraInfo ? <div>{ extraInfo }</div> : '' }
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
        const selected = _.filter(categories, cat => cat._id === activeKey);

        // activeKey不存在或者对应的category不存在, 则重新赋默认值
        if (selected.length < 1) {
            this.setState({
                activeKey: (categories && categories.length > 0) ? categories[0]._id : ''
            });
        }
    }

    render() {
        const { categories, addCategory, deleteCategory, updateCategory, getExtraInfo } = this.props;

        return (
            <div className='category-panel section-panel'>
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
                                tab={ <TabPaneHeader name={ cat.name } extraInfo={ getExtraInfo ? getExtraInfo(cat) : '' }/> }
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
    updateCategory: PropTypes.func.isRequired,
    getExtraInfo: PropTypes.func
};

export default CategoryPanel;