import * as EnumRecordType from '../constants/EnumRecordType';

export const getRecordTypeName = (type) => {
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
};