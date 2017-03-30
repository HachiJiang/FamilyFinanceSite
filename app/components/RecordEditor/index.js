/*
 * RecordEditor
 *
 * Edit single record, provide corresponding options based on input record type
 */

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Tabs from '../base/Tabs';
import Pulldown2 from '../base/Pulldown2';
import AddItemForm from '../base/AddItemForm';

import * as EnumRecordType from '../../constants/EnumRecordType';
import TABS from './tabConfig';

//const TITLES = ["[Outcome]", "[Income]", "[Transfer]", "[Borrow]", "[Lend]", "[Repay]", "[Collect Debt]"];
// 共 10 项设置: 支出分类, 收入分类, 转出账户, 转入账户, 金额, 成员, 债权人, 日期, 项目, 备注

function getDefaultValue(items) {
    if (_.isEmpty(items)) {
        return '[请选择...]';
    }

    const subItems = items[0].items;
    if (!subItems) {
        return items[0].name;
    } else if (subItems[0]) {
        return subItems[0].name;
    }
}

class RecordEditor extends Component {
    constructor(props) {
        super(props);

        const { activeIndex, outcomeCategories, incomeCategories, accountCategories, projectCategories, members, debtMembers } = this.props;
        this.state = {                      // local state to store form
            type: activeIndex || 0,
            catOutcome: getDefaultValue(outcomeCategories),              // 支出类别
            catIncome: getDefaultValue(incomeCategories),                // 收入类别
            catAccountTo: getDefaultValue(accountCategories),            // 转入账户
            catAccountFrom: getDefaultValue(accountCategories),           // 转出账户
            amount: 0,                    // 金额
            member: getDefaultValue(members),                   // 成员
            debtMember: getDefaultValue(debtMembers),                   // 债权人
            date: '',                     // 日期
            project: getDefaultValue(projectCategories),                  // 项目
            tips: ''                      // 备注
        };
    }

    /**
     * Get all the controllers
     * @param {String} type: record type
     * @returns {XML[]}
     */
    getControls(type) {
        const { outcomeCategories, incomeCategories, accountCategories, projectCategories, members, debtMembers,
            addCategoryOutcome, addCategoryIncome, addCategoryAccount, addCategoryProject, addMember, addDebtMember } = this.props;
        const { catOutcome, catIncome, catAccountFrom, catAccountTo, project, member, debtMember } = this.state;
        const subTitles = TABS[type].subTitles;

        return [
            <Pulldown2 key="cat-outcome"
                       title={ subTitles[0] }
                       items={ outcomeCategories }
                       value={ catOutcome }
                       onSelectionChange={ value => this.setState({ catOutcome: value })}
                       addSubCategory={ addCategoryOutcome }
                >
                <AddItemForm onSubmit={ addCategoryOutcome }/>
            </Pulldown2>,
            <Pulldown2 key="cat-income"
                       title={ subTitles[1] }
                       items={ incomeCategories }
                       value={ catIncome }
                       onSelectionChange={ value => this.setState({ catIncome: value })}
                       addSubCategory={ addCategoryIncome }
                >
                <AddItemForm onSubmit={ addCategoryIncome }/>
            </Pulldown2>,
            <Pulldown2 key='cat-account-from'
                       title={ subTitles[2] }
                       items={ accountCategories }
                       value={ catAccountFrom }
                       onSelectionChange={ value => this.setState({ catAccountFrom: value })}
                       addSubCategory={ addCategoryAccount }
                >
                <AddItemForm onSubmit={ addCategoryAccount }/>
            </Pulldown2>,
            <Pulldown2 key='cat-account-to'
                       title={ subTitles[3] }
                       items={ accountCategories }
                       value={ catAccountTo }
                       onSelectionChange={ value => this.setState({ catAccountTo: value })}
                       addSubCategory={ addCategoryAccount }
                >
                <AddItemForm onSubmit={ addCategoryAccount }/>
            </Pulldown2>,
            <Pulldown2 key='project'
                       title={ subTitles[4] }
                       items={ projectCategories }
                       value={ project }
                       onSelectionChange={ value => this.setState({ project: value })}
                       addSubCategory={ addCategoryProject }
                >
                <AddItemForm onSubmit={ addCategoryProject }/>
            </Pulldown2>,
            <Pulldown2 key='members'
                       title={ subTitles[5] }
                       items={ members }
                       value={ member }
                       onSelectionChange={ value => this.setState({ member: value })}
                       addSubCategory={ addMember }
                >
                <AddItemForm onSubmit={ addMember }/>
            </Pulldown2>,
            <Pulldown2 key='debtMembers'
                       title={ subTitles[6] }
                       items={ debtMembers }
                       value={ debtMember }
                       onSelectionChange={ value => this.setState({ debtMember: value })}
                       addSubCategory={ addDebtMember }
                >
                <AddItemForm onSubmit={ addDebtMember }/>
            </Pulldown2>
        ];
    }

    render() {
        const type = this.state.type;
        const controls = this.getControls(type);

        return (
            <div className="record-editor">
                <Tabs activeIndex={ type } onSwitch={ activeIndex => this.setState({ type:activeIndex }) } >
                    {
                        TABS.map((tab, type) => {
                            return (
                                <div key={ type } title={ tab.title } className='control'>
                                    { controls.filter((ctrl, index) => TABS[type].flags[index]) }
                                </div>
                            )
                        })
                    }
                </Tabs>
                <button className='saveBtn btn'>[保存]</button>
            </div>
        );
    }
}

RecordEditor.propTypes = {
    outcomeCategories: PropTypes.arrayOf(PropTypes.object),
    incomeCategories: PropTypes.arrayOf(PropTypes.object),
    accountCategories: PropTypes.arrayOf(PropTypes.object),
    projectCategories: PropTypes.arrayOf(PropTypes.object),
    members: PropTypes.arrayOf(PropTypes.object),
    debtMembers: PropTypes.arrayOf(PropTypes.object),
    activeIndex: PropTypes.number,
    addCategoryOutcome: PropTypes.func,
    addCategoryIncome: PropTypes.func,
    addCategoryAccount: PropTypes.func,
    addCategorProject: PropTypes.func,
    addMember: PropTypes.func
};

export default RecordEditor;