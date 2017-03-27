/*
 * RecordEditor
 *
 * Edit single record, provide corresponding options based on input record type
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Tabs from '../base/Tabs';
import Pulldown2 from '../base/Pulldown2';
import AddItemForm from '../base/AddItemForm';

import * as EnumRecordType from '../../constants/EnumRecordType';

//const TITLES = ["[Outcome]", "[Income]", "[Transfer]", "[Borrow]", "[Lend]", "[Repay]", "[Collect Debt]"];
// 共 9 项设置: 分类, 转入账户, 转出账户, 债权账户, 金额, 成员, 日期, 项目, 备注
const TABS = [
    {
        title: "[支出]",
        flags: [1, 0, 1, 0, 1, 1, 1, 1, 1] // indicate whether the tab needs corresponding control
    }, {
        title: "[收入]",
        flags: [1, 1, 0, 0, 1, 1, 1, 1, 1]
    }, {
        title: "[借入]",
        flags: [1, 1, 0, 1, 1, 1, 1, 1, 1]
    }, {
        title: "[借出]",
        flags: [1, 0, 1, 1, 1, 1, 1, 1, 1]
    }, {
        title: "[还款]",
        flags: [1, 0, 1, 1, 1, 1, 1, 1, 1]
    }, {
        title: "[收债]",
        flags: [1, 1, 0, 1, 1, 1, 1, 1, 1]
    }
];

/**
 * Get all the controllers
 * @param {Object} props
 * @returns {*[]}
 */
function getControls(props) {
    const catOutcome = props.catOutcome;
    return [(
        <Pulldown2 key={0}
                   title='[分类]'
                   items={catOutcome}
                   onSelectionChange={ (selected) => this.setState({ catSelected: selected })}>
            <AddItemForm />
        </Pulldown2>
    )];
}

function getEditorControls(type, controls) {
    const flags = TABS[type].flags;
    switch(type) {
        case EnumRecordType.OUTCOME:
            return (
                controls.filter((ctrl, index) => flags[index] === 1)
            );
        default:
            break;
    }
}

class RecordEditor extends Component {
    state = { // local state to store form
        type: this.props.activeIndex || 0,
        catSelected: this.props.catSelected || [0, 0]
    };

    render() {
        let controls = getControls.call(this, this.props);
        return (
            <div className="record-editor">
                <Tabs activeIndex={this.state.type}>
                    {
                        TABS.map((tab, index) => (
                            <div key={index} title={tab.title} className='control' >
                                { getEditorControls(index, controls) }
                            </div>
                        ))
                    }
                </Tabs>
                <button className='saveBtn btn'>[保存]</button>
            </div>
        );
    }
}

RecordEditor.propTypes = {
    catOutcome: PropTypes.array,
    activeIndex: PropTypes.number,
    catSelected: PropTypes.array // @TODO: add more state
};

export default RecordEditor;