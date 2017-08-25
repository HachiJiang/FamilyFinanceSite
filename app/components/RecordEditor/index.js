'use strict';

/*
 * RecordEditor
 *
 * Edit single record, provide corresponding options based on input record type
 */

import _ from 'lodash';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import { Button, DatePicker, InputNumber, Input, message } from 'antd';

import Tabs from '../base/Tabs';
import Pulldown2 from '../base/Pulldown2';
import BaseInput from '../base/Input';

import * as EnumRecordType from '../../constants/EnumRecordType';
import TABS from './tabConfig';
import { getDefaultRecord } from './selectors';

import { getPropKeysByType, getCategoryVal, validateRecord } from '../../utils/recordUtils';
import { CONSUME_DATE_FORMAT, DECIMAL_PRECISION } from '../../constants/Config';

// 共 10 项设置: 支出分类, 收入分类, 转出账户, 转入账户, 金额, 成员, 债权人, 日期, 项目, 备注

/**
 * Get initial state
 * @param {Object} record
 * @param {Object} oldState
 * @returns {Object}
 */
function getInitialState(record = {}, oldState = {}) {
    const oldConsumeDate = oldState.consumeDate;
    return {
        amount: 0,
        amountPreTax: 0,
        bonusPreTax: 0,
        consumeDate: oldConsumeDate ? oldConsumeDate : moment(),
        tips: '',
        ...record
    };
}

/**
 * Get tab index by record type
 * @param {String} type
 * @returns {number}
 */
function typeToIdx(type = EnumRecordType.OUTCOME) {
    return _.findIndex(TABS, { value: type });
}

/**
 * Get record type by tab index
 * @param {number} idx
 * @returns {String}
 */
function idxToType(idx) {
    return TABS[idx].value;
}

function onPressEnter(e) {
    e.preventDefault();
}

class RecordEditor extends Component {
    constructor(props) {
        super(props);
        this.state = getInitialState(this.props.record);
    }

    componentWillReceiveProps(nextProps) {
        const oldState = this.state;
        const propKeys = getPropKeysByType(oldState.type);
        const defaultRecord = getDefaultRecord(nextProps.schema, oldState.type);
        let newState = _.clone(oldState);

        // defaultRecord should override undefined prop only
        _.forEach(propKeys, key => {
            if (!newState[key]) {
                newState[key] = defaultRecord[key];
            }
        });

        this.setState(newState);
    }

    save() {
        const { addRecord, updateRecord } = this.props;
        const state = this.state;
        const record = validateRecord({ // should save id for schema info
            ...state,
            amount: _.toNumber(state.amount),
            consumeDate: moment(state.consumeDate.format(CONSUME_DATE_FORMAT)).utc().toString()
        });

        if (!record) {
            message.warning('输入信息不全或有误..');
            return;
        }

        if (record._id && updateRecord) {
            updateRecord(record._id, record);
            this.setState({
                ...record,
                consumeDate: state.consumeDate
            });
        } else if (addRecord) {
            addRecord(record);
            this.reset();
        }
    }

    reset() {
        this.setState(getInitialState(this.props.record, this.state));
    }

    /**
     * Get all the controllers
     * @param {number} activeIndex
     * @returns {XML[]}
     */
    getControls(activeIndex) {
        const { schema: { outcomeCategories, incomeCategories, accountCategories, projectCategories, members, debtors },
            addOutcomeCategory, addIncomeCategory, addAccountCategory, addProjectCategory, addMember, addDebtor } = this.props;
        const { type, category, amount = 0, amountPreTax = 0, bonusPreTax = 0, accountFrom, accountTo, project, consumeDate, member, debtor, tips } = this.state;
        const subTitles = TABS[activeIndex].subTitles;

        return [
            <Pulldown2
                key="cat-outcome"
                title={ subTitles[0] }
                items={ outcomeCategories }
                value={ type === EnumRecordType.OUTCOME ? category : '' }
                onSelectionChange={ (catId, itemId) => this.setState({ category: getCategoryVal(catId, itemId) }) }
                addItem={ addOutcomeCategory }
            >
            </Pulldown2>,
            <Pulldown2
                key="cat-income"
                title={ subTitles[1] }
                items={ incomeCategories }
                value={ type === EnumRecordType.INCOME ? category : '' }
                onSelectionChange={ (catId, itemId) => this.setState({ category: getCategoryVal(catId, itemId) }) }
                addItem={ addIncomeCategory }
            >
            </Pulldown2>,
            <Pulldown2
                key="cat-account-from"
                title={ subTitles[2] }
                items={ accountCategories }
                value={ accountFrom }
                onSelectionChange={ (catId, itemId) => this.setState({ accountFrom: getCategoryVal(catId, itemId) }) }
                addItem={ addAccountCategory }
            >
            </Pulldown2>,
            <Pulldown2
                key="cat-account-to"
                title={ subTitles[3] }
                items={ accountCategories }
                value={ accountTo }
                onSelectionChange={ (catId, itemId) => this.setState({ accountTo: getCategoryVal(catId, itemId) }) }
                addItem={ addAccountCategory }
            >
            </Pulldown2>,
            <Pulldown2
                key="project"
                title={ subTitles[4] }
                items={ projectCategories }
                value={ project }
                onSelectionChange={ (catId, itemId) => this.setState({ project: getCategoryVal(catId, itemId) }) }
                addItem={ addProjectCategory }
            >
            </Pulldown2>,
            <Pulldown2
                key="debtors"
                title={ subTitles[5] }
                items={ debtors }
                value={ debtor }
                onSelectionChange={ id => this.setState({ debtor: id })}
                addItem={ addDebtor }
            >
            </Pulldown2>,
            <Pulldown2
                key="members"
                title="成员"
                items={ members }
                value={ member }
                onSelectionChange={ id => this.setState({ member: id })}
                addItem={ addMember }
            >
            </Pulldown2>,
            <BaseInput key="amount" title="金额: ">
                <InputNumber
                    value= { amount }
                    min={ 0 }
                    onChange={ value => this.setState({ amount: value, amountPreTax: value }) }
                    precision={ DECIMAL_PRECISION }
                />
            </BaseInput>,
            <BaseInput key="amountPreTax" title="税前: ">
                <InputNumber
                    value= { amountPreTax }
                    min={ 0 }
                    onChange={ value => this.setState({ amountPreTax: value }) }
                    precision={ DECIMAL_PRECISION }
                />
            </BaseInput>,
            <BaseInput key="bonusPreTax" title="税前bonus: ">
                <InputNumber
                    value= { bonusPreTax }
                    min={ 0 }
                    onChange={ value => this.setState({ bonusPreTax: value }) }
                    precision={ DECIMAL_PRECISION }
                />
            </BaseInput>,
            <BaseInput key="date" title="日期: " >
                <DatePicker
                    format={ CONSUME_DATE_FORMAT }
                    allowClear={ false }
                    defaultValue={ moment() }
                    value={ consumeDate }
                    onChange={ value => { value && this.setState({ consumeDate: value }) } }
                />
            </BaseInput>,
            <BaseInput key="tips" title="备注: " >
                <Input
                    placeholder="输入备注..."
                    value = { tips }
                    onChange={ e => this.setState({ tips: e.target.value }) }
                    onPressEnter={ onPressEnter }
                />
            </BaseInput>
        ];
    }

    render() {
        const activeIndex =  typeToIdx(this.state.type);
        const controls = this.getControls(activeIndex);

        return (
            <div className="record-editor section-panel">
                <Tabs activeIndex={ activeIndex } onSwitch={ activeIndex => this.setState(getDefaultRecord(this.props.schema, idxToType(activeIndex))) } >
                    {
                        TABS.map((tab, i) => (
                            <div key={ i } title={ tab.title } className='control'>
                                { controls.filter((ctrl, index) => TABS[i].flags[index]) }
                            </div>
                        ))
                    }
                </Tabs>
                <div className="btns">
                    <Button className="fn-btn" onClick={ e => this.reset() }>[重置]</Button>
                    <Button className="fn-btn" type="primary" onClick={ e => this.save() }>[保存]</Button>
                </div>
            </div>
        );
    }
}

RecordEditor.propTypes = {
    schema: PropTypes.shape({
        outcomeCategories: PropTypes.arrayOf(PropTypes.object),
        incomeCategories: PropTypes.arrayOf(PropTypes.object),
        accountCategories: PropTypes.arrayOf(PropTypes.object),
        projectCategories: PropTypes.arrayOf(PropTypes.object),
        members: PropTypes.arrayOf(PropTypes.object),
        debtors: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    record: PropTypes.shape({
        _id: PropTypes.string,
        type: PropTypes.string.required,
        amount: PropTypes.number.required,
        consumeDate: PropTypes.object.required,
        category: PropTypes.string,
        accountFrom: PropTypes.string,
        accountTo: PropTypes.string,
        project: PropTypes.string,
        member: PropTypes.string
    }),
    addOutcomeCategory: PropTypes.func.isRequired,
    addIncomeCategory: PropTypes.func.isRequired,
    addAccountCategory: PropTypes.func.isRequired,
    addProjectCategory: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired,
    addRecord: PropTypes.func.isRequired,
    updateRecord: PropTypes.func.isRequired
};

export default RecordEditor;