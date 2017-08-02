'use strict';

/**
 * RecordEditor selectors
 */
import _ from 'lodash';
import * as EnumRecordType from '../../constants/EnumRecordType';
import { ID_SEPARATOR } from '../../constants/Config';

function getDefaultCatId(categories, idStr = '') {
    if (_.isArray(categories) && categories.length > 0) {
        const cat = categories[0];
        return getDefaultCatId((cat && cat.items) ? cat.items : cat, idStr ? (idStr + ID_SEPARATOR + cat._id) : cat._id);
    }

    if (categories) {
        return idStr;
    }
}

/**
 * Get default record for editor - OUTCOME
 * @param {Object} schema
 * @returns {{}}
 */
function getDefaultRecordOutcome(schema) {
    return {
        type: EnumRecordType.OUTCOME,
        amount: 0,
        category: getDefaultCatId(schema.outcomeCategories),
        accountFrom: getDefaultCatId(schema.accountCategories),
        project: getDefaultCatId(schema.projectCategories),
        member: getDefaultCatId(schema.members)
    };
}

/**
 * Get default record for editor - INCOME
 * @param {Object} schema
 * @returns {{}}
 */
function getDefaultRecordIncome(schema) {
    return {
        type: EnumRecordType.INCOME,
        amount: 0,
        project: getDefaultCatId(schema.projectCategories),
        member: getDefaultCatId(schema.members),
        category: getDefaultCatId(schema.incomeCategories),
        accountTo: getDefaultCatId(schema.accountCategories)
    };
}

/**
 * Get default record for editor - TRANSFER
 * @param {Object} schema
 * @returns {{}}
 */
function getDefaultRecordTransfer(schema) {
    return {
        type: EnumRecordType.TRANSFER,
        amount: 0,
        project: getDefaultCatId(schema.projectCategories),
        member: getDefaultCatId(schema.members),
        accountFrom: getDefaultCatId(schema.accountCategories),
        accountTo: getDefaultCatId(schema.accountCategories)
    };
}

/**
 * Get default record for editor - BORROW
 * @param {Object} schema
 * @returns {{}}
 */
function getDefaultRecordBorrow(schema) {
    return {
        type: EnumRecordType.BORROW,
        amount: 0,
        project: getDefaultCatId(schema.projectCategories),
        member: getDefaultCatId(schema.members),
        accountTo: getDefaultCatId(schema.accountCategories),
        debtor: getDefaultCatId(schema.debtors)
    };
}

/**
 * Get default record for editor - LEND
 * @param {Object} schema
 * @returns {{}}
 */
function getDefaultRecordLend(schema) {
    return {
        type: EnumRecordType.LEND,
        amount: 0,
        project: getDefaultCatId(schema.projectCategories),
        member: getDefaultCatId(schema.members),
        accountFrom: getDefaultCatId(schema.accountCategories),
        debtor: getDefaultCatId(schema.debtors)
    };
}

/**
 * Get default record for editor - REPAY
 * @param {Object} schema
 * @returns {{}}
 */
function getDefaultRecordRepay(schema) {
    return {
        type: EnumRecordType.REPAY,
        amount: 0,
        project: getDefaultCatId(schema.projectCategories),
        member: getDefaultCatId(schema.members),
        accountFrom: getDefaultCatId(schema.accountCategories),
        debtor: getDefaultCatId(schema.debtors)
    };
}

/**
 * Get default record for editor - COLLECT_DEBT
 * @param {Object} schema
 * @returns {{}}
 */
function getDefaultRecordCollectDebt(schema) {
    return {
        type: EnumRecordType.COLLECT_DEBT,
        amount: 0,
        project: getDefaultCatId(schema.projectCategories),
        accountTo: getDefaultCatId(schema.accountCategories),
        member: getDefaultCatId(schema.members),
        debtor: getDefaultCatId(schema.debtors)
    };
}

/**
 * Get default record for editor
 * @param {Object} schema
 * @param {String} type
 * @returns {{}}
 */
const getDefaultRecord = (schema, type) => {
    switch(type) {
        case EnumRecordType.OUTCOME:
        default:
            return getDefaultRecordOutcome(schema);
        case EnumRecordType.INCOME:
            return getDefaultRecordIncome(schema);
        case EnumRecordType.TRANSFER:
            return getDefaultRecordTransfer(schema);
        case EnumRecordType.BORROW:
            return getDefaultRecordBorrow(schema);
        case EnumRecordType.LEND:
            return getDefaultRecordLend(schema);
        case EnumRecordType.REPAY:
            return getDefaultRecordRepay(schema);
        case EnumRecordType.COLLECT_DEBT:
            return getDefaultRecordCollectDebt(schema);
    }
};

/**
 * Get property keys by record type
 * @param {String} type
 * @returns {Object}
 */
const getPropKeysByType = type => {
    const keys = ['type', 'amount', 'project', 'tips', 'consumeDate', 'member'];
    switch(type) {
        case EnumRecordType.OUTCOME:
        default:
            return keys.concat(['category', 'accountFrom']);
        case EnumRecordType.INCOME:
            return keys.concat(['category', 'accountFrom']);
        case EnumRecordType.TRANSFER:
            return keys.concat(['accountFrom', 'accountTo']);
        case EnumRecordType.BORROW:
        case EnumRecordType.COLLECT_DEBT:
            return keys.concat(['accountTo', 'project']);
        case EnumRecordType.LEND:
        case EnumRecordType.REPAY:
            return keys.concat(['accountFrom', 'project']);
    }
};

export {
    getDefaultRecord,
    getPropKeysByType
};