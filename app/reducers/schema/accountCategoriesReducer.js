/*
 *
 * Account reducer
 *
 */

import _ from 'lodash';
import * as CategoryActionTypes from '../../actiontypes/category';
import { addCategory } from './categoriesReducerUtils';

const initialState = [
    {
        name: '现金'
    }, {
        name: '信用卡',
        items: [
            { name: '招商银行' }
        ]
    }, {
        name: '银行卡',
        items: [
            { name: '招商银行' }
        ]
    }, {
        name: '定期',
        items: []
    }, {
        name: '基金',
        items: [
            { name: '余额宝' },
            { name: '朝朝盈' }
        ]
    }, {
        name: '股票',
        items: []
    }, {
        name: '保险',
        items: []
    }
];

function accountCategoriesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY_ACCOUNT:
            return addCategory(state, action);
        case CategoryActionTypes.DELETE_CATEGORY_ACCOUNT:

            return state;

        case CategoryActionTypes.UPDATE_CATEGORY_ACCOUNT:
            return state;

        default:
            return state;
    }
}

export default accountCategoriesReducer;