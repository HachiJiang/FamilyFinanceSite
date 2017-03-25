/*
 * RecordEditor
 *
 * Edit single record, provide corresponding options based on input record type
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Tabs from '../base/Tabs';
import Pulldown from '../base/Pulldown';
import MenuItem2 from '../base/MenuItem2';

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

function getControls(catOutcome) {
    return [(
        <Pulldown key={0} title='[分类]' value={catOutcome[0].items[0]} items={catOutcome}>
            {
                catOutcome.map((cat, index) => (
                    <MenuItem2 key={index} title={cat.name} items={cat.items}/>
                ))
            }
        </Pulldown>
    )];
}

function getEditorControls(type, controls) {
    const flags = TABS[type].flags;
    switch(type) {
        case EnumRecordType.OUTCOME:
            return (
                controls.map((ctrl, index) => {
                    if (flags[index] === 1) return ctrl;
                })
            );
        default:
            break;
    }
}

class RecordEditor extends Component {
    static propTypes = {
        catOutcome: PropTypes.array,
        activeIndex: PropTypes.number,
        catOutcomeSelected: PropTypes.array // @TODO: add more state
    };

    state = { // local state to store form
        type: this.props.activeIndex || 0,
        catOutcomeSelected: this.props.catOutcomeSelected || [0, 0]
    };

    render() {
        let controls = getControls(this.props.catOutcome);
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
                <button className='saveBtn btn btn-primary'>[保存]</button>
            </div>
        );
    }
}

export default RecordEditor;