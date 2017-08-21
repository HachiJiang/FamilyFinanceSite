'use strict';

/**
 * RecordEditor selectors
 */
import _ from 'lodash';
import * as EnumRecordType from '../../constants/EnumRecordType';
import { ID_SEPARATOR } from '../../constants/Config';

/**
 * Get default id string for two-level categories
 * @param {Array} categories
 * @returns {*}
 */
function getDefaultCatId(categories) {
    if (!_.isArray(categories) || categories.length < 1) {
        return;
    }

    const cat = categories[0];
    const itemId = getDefaultItemId(cat && cat.items);
    if (itemId) {
        return cat._id + ID_SEPARATOR + itemId;
    }
}

/**
 * Get default item id for one-level category
 * @param {Array} items
 */
function getDefaultItemId(items) {
    const item = items && items[0];
    if (item) {
        return item._id;
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
        member: getDefaultItemId(schema.members)
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
        amountPreTax: 0,
        bonusPreTax: 0,
        project: getDefaultCatId(schema.projectCategories),
        member: getDefaultItemId(schema.members),
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
        member: getDefaultItemId(schema.members),
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
        member: getDefaultItemId(schema.members),
        accountTo: getDefaultCatId(schema.accountCategories),
        debtor: getDefaultItemId(schema.debtors)
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
        member: getDefaultItemId(schema.members),
        accountFrom: getDefaultCatId(schema.accountCategories),
        debtor: getDefaultItemId(schema.debtors)
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
        member: getDefaultItemId(schema.members),
        accountFrom: getDefaultCatId(schema.accountCategories),
        debtor: getDefaultItemId(schema.debtors)
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
        member: getDefaultItemId(schema.members),
        debtor: getDefaultItemId(schema.debtors)
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

export {
    getDefaultRecord
};