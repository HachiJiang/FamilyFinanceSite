/*
 * Record
 *
 * Single finance record
 */
import React, { PureComponent, PropTypes } from 'react';

import * as EnumRecordType from '../../constants/EnumRecordType';

function getTypeName(type) {
    switch(type) {
        case EnumRecordType.INCOME:
            return '[收入]';
        case EnumRecordType.OUTCOME:
            return '[支出]';
        case EnumRecordType.TRANSFER:
            return '[转账]';
        case EnumRecordType.BORROW:
            return '[借入]';
        case EnumRecordType.LEND:
            return '[借出]';
        case EnumRecordType.COLLECT_DEBT:
            return '[收债]';
        case EnumRecordType.REPAY:
            return '[还款]';
        default:
            break;
    }
}

function getAmountClass(type) {
    switch(type) {
        case EnumRecordType.INCOME:
            return 'record-positive-val';
        case EnumRecordType.OUTCOME:
            return 'record-negative-val';
        default:
            break;
    }
}

function getAmountString(type, amount) {
    switch(type) {
        case EnumRecordType.OUTCOME:
        case EnumRecordType.LEND:
        case EnumRecordType.REPAY:
            return '-' + amount;
        default:
            return amount;
    }
}

function generateDesc(props) {
    switch(props.type) {
        case EnumRecordType.INCOME:
        case EnumRecordType.OUTCOME:
            return props.category;
        case EnumRecordType.TRANSFER:
            return props.accountFrom + ' => ' + props.accountTo;
        case EnumRecordType.BORROW:
        case EnumRecordType.COLLECT_DEBT:
            return props.debtMember + ' => ' + props.accountTo;
        case EnumRecordType.LEND:
        case EnumRecordType.REPAY:
            return props.accountFrom + ' => ' + props.debtMember;
        default:
            return '';
    }
}

export default class Record extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        member: PropTypes.string.isRequired,
        tips: PropTypes.string.isRequired,
        category: PropTypes.string,
        accountFrom: PropTypes.string,
        accountTo: PropTypes.string,
        debtMember: PropTypes.string,
        project: PropTypes.string,
        date: PropTypes.string,
        deleteRecord: PropTypes.func
    };

    render() {
        const props = this.props;
        const { id, date, type, amount, member, project, tips } = props;
        const desc = generateDesc(props);

        return (
            <div className='record-item'>
                <a className='remove-record'
                    onClick={() => props.deleteRecord(id)}>
                    ✖
                </a>
                <div className='cell'><span>{ date }</span></div>
                <div className='cell'><span>{ getTypeName(props.type) }</span></div>
                <div className='cell'><span>{ desc }</span></div>
                <div className='cell'><span className={ getAmountClass(type) }>{ getAmountString(type, amount) }</span></div>
                <div className='cell'><span>{ member }</span></div>
                <div className='cell'><span>{ project }</span></div>
                <div className='cell'><span>{ tips }</span></div>
            </div>
        );
    }
}