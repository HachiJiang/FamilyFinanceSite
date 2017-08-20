'use strict';

import _ from 'lodash';
import moment from 'moment';
import { ID_SEPARATOR } from '../constants/Config';
import * as EnumRecordType from '../constants/EnumRecordType';

const OPTIONAL_PARAMS = ['_id', 'tips', 'location', 'createdAt', 'updatedAt'];

/**
 * Get name corresponding to specific record type
 * @param {string} type
 * @returns {string}
 */
const getRecordTypeName = (type) => {
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

/**
 * Get property keys by record type
 * @param {String} type
 * @returns {Object}
 */
const getPropKeysByType = type => {
    const keys = ['_id', 'type', 'amount', 'project', 'tips', 'consumeDate', 'member', 'location', 'createdAt', 'updatedAt'];
    switch(type) {
        case EnumRecordType.OUTCOME:
        default:
            return keys.concat(['category', 'accountFrom']);
        case EnumRecordType.INCOME:
            return keys.concat(['category', 'accountTo']);
        case EnumRecordType.TRANSFER:
            return keys.concat(['accountFrom', 'accountTo']);
        case EnumRecordType.BORROW:
        case EnumRecordType.COLLECT_DEBT:
            return keys.concat(['accountTo', 'debtor']);
        case EnumRecordType.LEND:
        case EnumRecordType.REPAY:
            return keys.concat(['accountFrom', 'debtor']);
    }
};

/**
 * Validate record and return with necessary props only
 * Avoid redundant info
 * @param {Object} record
 * @returns {{}}
 */
const validateRecord = record => {
    if (!record) {
        return;
    }

    let validRecord = {};
    let isValid = true;
    _.forIn(getPropKeysByType(record.type), key => {
        if (OPTIONAL_PARAMS.indexOf(key) === -1 && !record[key]) {
            isValid = false;
            return false;
        }
        validRecord[key] = record[key];
    });
    return isValid ? validRecord : null;
};

/**
 * Get value of schema category for saving to DB
 * @param {string} catId
 * @param {string} itemId
 * @returns {string}
 */
const getCategoryVal = (catId, itemId) => {
    if (catId && itemId) {
        return [catId, itemId].join(ID_SEPARATOR);
    }
};

/**
 * Get categories names [catName, subCate]
 * @param idStr
 * @param categories
 * @returns {Array|String}
 */
const idStrToNames = (idStr, categories) => {
    if (!idStr || !_.isArray(categories)) {
        return;
    }

    const idArr = idStr.split(ID_SEPARATOR);
    const cat = _.find(categories, cat => cat._id === idArr[0]);

    if (!cat) {
        return;
    }

    if (idArr.length > 1 && _.isArray(cat.items)) {
        const target = _.find(cat.items, item => item._id === idArr[1]);
        return [target.name, cat.name]
    } else {
        return [cat.name];
    }
};

/**
 * Get category name
 * @param {string} idStr
 * @param {Array} categories
 * @returns {string}
 */
const idStrToName = (idStr = '', categories = []) => {
    const names = idStrToNames(idStr, categories);
    return _.isArray(names) ? names[0] : '';
};

/**
 * Parse raw list for display, id -> name
 * @param {Object} record
 * @param {Object} schema
 * @returns {Object}
 */
const parseRecord = (record, schema) => {
    if (!record) {
        console.log('invalid record');
        return;
    }

    const { outcomeCategories, incomeCategories, accountCategories, projectCategories, members, debtors } = schema;
    const consumeDate = moment.utc(record.consumeDate).local(); // convert to client time
    let result = {
        ...record,
        project: idStrToName(record.project, projectCategories),
        member: idStrToName(record.member, members),
        consumeDate,
        _raw: {
            ...record,
            consumeDate
        }  // store raw record
    };

    switch(record.type) {
        case EnumRecordType.OUTCOME:
            result.category = idStrToName(record.category, outcomeCategories);
            result.accountFrom = idStrToName(record.accountFrom, accountCategories);
            break;
        case EnumRecordType.INCOME:
            result.category = idStrToName(record.category, incomeCategories);
            result.accountTo = idStrToName(record.accountTo, accountCategories);
            break;
        case EnumRecordType.TRANSFER:
            result.accountFrom = idStrToName(record.accountFrom, accountCategories);
            result.accountTo = idStrToName(record.accountTo, accountCategories);
            break;
        case EnumRecordType.BORROW:
        case EnumRecordType.COLLECT_DEBT:
            result.accountTo = idStrToName(record.accountTo, accountCategories);
            result.debtor = idStrToName(record.debtor, debtors);
            break;
        case EnumRecordType.LEND:
        case EnumRecordType.REPAY:
            result.accountFrom = idStrToName(record.accountFrom, accountCategories);
            result.debtor = idStrToName(record.debtor, debtors);
            break;
        default:
            break;
    }

    return result;
};

export {
    getRecordTypeName,
    getPropKeysByType,
    validateRecord,
    getCategoryVal,
    idStrToNames,
    idStrToName,
    parseRecord
}