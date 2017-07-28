/**
 * RecordEditor selectors
 */

import * as EnumRecordType from '../../constants/EnumRecordType';

function getDefaultCat(categories) {
    if (_.isArray(categories)) {
        const category = categories[0];
        return getDefaultCat((category && category.items) ? category.items : category);
    }
    return categories && categories.name;
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
        category: getDefaultCat(schema.outcomeCategories),
        accountFrom: getDefaultCat(schema.accountCategories),
        project: getDefaultCat(schema.projectCategories),
        member: getDefaultCat(schema.members)
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
        category: getDefaultCat(schema.incomeCategories),
        accountTo: getDefaultCat(schema.accountCategories),
        project: getDefaultCat(schema.projectCategories),
        member: getDefaultCat(schema.members)
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
        accountFrom: getDefaultCat(schema.accountCategories),
        accountTo: getDefaultCat(schema.accountCategories),
        project: getDefaultCat(schema.projectCategories),
        member: getDefaultCat(schema.members)
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
        accountFrom: getDefaultCat(schema.accountCategories),
        accountTo: getDefaultCat(schema.accountCategories),
        project: getDefaultCat(schema.projectCategories),
        member: getDefaultCat(schema.members),
        debtor: getDefaultCat(schema.debtors)
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
        accountFrom: getDefaultCat(schema.accountCategories),
        accountTo: getDefaultCat(schema.accountCategories),
        project: getDefaultCat(schema.projectCategories),
        member: getDefaultCat(schema.members),
        debtor: getDefaultCat(schema.debtors)
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
        accountFrom: getDefaultCat(schema.accountCategories),
        accountTo: getDefaultCat(schema.accountCategories),
        project: getDefaultCat(schema.projectCategories),
        member: getDefaultCat(schema.members),
        debtor: getDefaultCat(schema.debtors)
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
        accountFrom: getDefaultCat(schema.accountCategories),
        accountTo: getDefaultCat(schema.accountCategories),
        project: getDefaultCat(schema.projectCategories),
        member: getDefaultCat(schema.members),
        debtor: getDefaultCat(schema.debtors)
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