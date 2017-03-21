/*
 * Record
 *
 * Single finance record
 */
import React, { PureComponent, PropTypes } from 'react';

import EnumRecordType from '../../constants/EnumRecordType';

function getTypeName(type) {
    switch(type) {
        case EnumRecordType.INCOME:
            return '[Income]';
        case EnumRecordType.OUTCOME:
            return '[Outcome]';
        default:
            break;
    }
}

function getAmountClass(type) {
    switch(type) {
        case EnumRecordType.INCOME:
            return 'record-income-val';
        case EnumRecordType.OUTCOME:
            return 'record-outcome-val';
        default:
            break;
    }
}

export default class Record extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        account: PropTypes.string.isRequired,
        project: PropTypes.string.isRequired,
        member: PropTypes.string.isRequired,
        tips: PropTypes.string.isRequired
    };

    render() {
        const props = this.props;
        return (
            <div className="record-item">
                <div>{ getTypeName(props.type) }</div>
                <div>{ props.category }</div>
                <div>{ props.account }</div>
                <div className={ getAmountClass(props.type) }>{ props.amount }</div>
                <div>{ props.project }</div>
                <div>{ props.member }</div>
                <div>{ props.tips }</div>
            </div>
        );
    }
}