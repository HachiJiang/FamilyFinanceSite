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
import Input from '../base/Input';

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

function getRecord(state) {
    const type = state.type;
    let record = {
        type,
        id: _.toString(Date.now()),
        amount: _.parseInt(state.amount),
        member: state.member,
        date: state.date,
        tips: state.tips
    };

    switch(type) {
        case EnumRecordType.INCOME:
            return _.assign({
                category: state.catIncome,
                accountTo: state.accountTo,
                project: state.project
            }, record);
        case EnumRecordType.OUTCOME:
            return _.assign({
                category: state.catOutcome,
                accountFrom: state.accountFrom,
                project: state.project
            }, record);
        case EnumRecordType.TRANSFER:
            return _.assign({
                accountTo: state.accountTo,
                accountFrom: state.accountFrom
            }, record);
        case EnumRecordType.BORROW:
        case EnumRecordType.COLLECT_DEBT:
            return _.assign({
                accountTo: state.accountTo,
                debtMember: state.debtMember
            }, record);
        case EnumRecordType.LEND:
        case EnumRecordType.REPAY:
            return _.assign({
                accountFrom: state.accountFrom,
                debtMember: state.debtMember
            }, record);
        default:
            return record;
    }
}

function generateCurrentDate() {
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return now.getFullYear() + '-' + month + '-' + day;
}

function getInitialState(activeIndex, props) {
    const accountCategories = props.accountCategories;

    return {
        type: activeIndex,
        amount: 0,                                          // 金额
        member: getDefaultValue(props.members),                   // 成员
        date: generateCurrentDate(),        // 日期
        tips: '',                                           // 备注
        catIncome: getDefaultValue(props.incomeCategories),
        catOutcome: getDefaultValue(props.outcomeCategories),
        accountFrom: getDefaultValue(accountCategories),
        accountTo: getDefaultValue(accountCategories),
        project: getDefaultValue(props.projectCategories),
        debtMember: getDefaultValue(props.debtMembers)
    };
}

class RecordEditor extends Component {
    constructor(props) {
        super(props);
        this.state = getInitialState(props.activeIndex || 0, this.props);
    }

    _readyToSave() {
        const { amount, date } = this.state;
        return !!amount && !!date;
    }

    save() {
        const { id, addRecord, updateRecord } = this.props;

        if (!this._readyToSave()) {
            return;
        }

        const record = getRecord(this.state);

        if (id && updateRecord) {
            updateRecord(id, record);
        } else if (addRecord) {
            addRecord(record);
        }
        this.setState(getInitialState(this.state.type, this.props));
    }

    /**
     * Get all the controllers
     * @param {String} type: record type
     * @returns {XML[]}
     */
    getControls(type) {
        const { outcomeCategories, incomeCategories, accountCategories, projectCategories, members, debtMembers,
            addCategoryOutcome, addCategoryIncome, addCategoryAccount, addCategoryProject, addMember, addDebtMember } = this.props;
        const { catOutcome, catIncome, amount, accountFrom, accountTo, project, date, member, debtMember, tips } = this.state;
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
            <Pulldown2 key="cat-account-from"
                       title={ subTitles[2] }
                       items={ accountCategories }
                       value={ accountFrom }
                       onSelectionChange={ value => this.setState({ accountFrom: value })}
                       addSubCategory={ addCategoryAccount }
                >
                <AddItemForm onSubmit={ addCategoryAccount }/>
            </Pulldown2>,
            <Pulldown2 key="cat-account-to"
                       title={ subTitles[3] }
                       items={ accountCategories }
                       value={ accountTo }
                       onSelectionChange={ value => this.setState({ accountTo: value })}
                       addSubCategory={ addCategoryAccount }
                >
                <AddItemForm onSubmit={ addCategoryAccount }/>
            </Pulldown2>,
            <Pulldown2 key="project"
                       title={ subTitles[4] }
                       items={ projectCategories }
                       value={ project }
                       onSelectionChange={ value => this.setState({ project: value })}
                       addSubCategory={ addCategoryProject }
                >
                <AddItemForm onSubmit={ addCategoryProject }/>
            </Pulldown2>,
            <Pulldown2 key="debtMembers"
                       title={ subTitles[5] }
                       items={ debtMembers }
                       value={ debtMember }
                       onSelectionChange={ value => this.setState({ debtMember: value })}
                       addSubCategory={ addDebtMember }
                >
                <AddItemForm onSubmit={ addDebtMember }/>
            </Pulldown2>,
            <Pulldown2 key="members"
                       title="[成员]"
                       items={ members }
                       value={ member }
                       onSelectionChange={ value => this.setState({ member: value })}
                       addSubCategory={ addMember }
                >
                <AddItemForm onSubmit={ addMember }/>
            </Pulldown2>,
            <Input key="amount"
                   title="[金额]"
                   type="number"
                   value={amount}
                   placeholder="[输入金额...]"
                   onChange={ value => this.setState({ amount: value }) }
                >
            </Input>,
            <Input key="date"
                   title="[日期]"
                   type="date"
                   value={date}
                   onChange={ value => this.setState({ date: value }) }
                >
            </Input>,
            <Input key="tips"
                   title="[备注]"
                   type="text"
                   value={tips}
                   placeholder="[输入备注...]"
                   onChange={ value => this.setState({ tips: value }) }
                >
            </Input>
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
                <button className='saveBtn btn' onClick={ e => this.save() }>[保存]</button>
            </div>
        );
    }
}

RecordEditor.propTypes = {
    id: PropTypes.string,
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
    addMember: PropTypes.func,
    addRecord: PropTypes.func,
    updateRecord: PropTypes.func
};

export default RecordEditor;