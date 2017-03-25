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
            <div className='record-item'>
                <div className='cell'><span>{ getTypeName(props.type) }</span></div>
                <div className='cell'><span>{ props.category }</span></div>
                <div className='cell'><span>{ props.account }</span></div>
                <div className='cell'><span className={ getAmountClass(props.type) }>{ props.amount }</span></div>
                <div className='cell'><span>{ props.project }</span></div>
                <div className='cell'><span>{ props.member }</span></div>
                <div className='cell'><span>{ props.tips }</span></div>
            </div>
        );
    }
}