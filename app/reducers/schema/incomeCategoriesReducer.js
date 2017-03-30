/*
 *
 * Income category reducer
 *
 */

import _ from 'lodash';
import * as CategoryActionTypes from '../../actiontypes/category';
import { addCategory } from './categoriesReducerUtils';

const initialState = [
    {
        name: '职业',
        items: [
            { name: '工资' },
            { name: '奖金' },
            { name: '兼职' }
        ]
    }, {
        name: '理财',
        items: [
            { name: '基金利息' },
            { name: '股票分红' }
        ]
    }
];

function incomeCategoriesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY_INCOME:
            return addCategory(state, action);
        case CategoryActionTypes.DELETE_CATEGORY_INCOME:

            return state;

        case CategoryActionTypes.UPDATE_CATEGORY_INCOME:
            return state;

        default:
            return state;
    }
}

export default incomeCategoriesReducer;