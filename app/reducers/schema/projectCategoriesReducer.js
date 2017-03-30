/*
 *
 * Project categories reducer
 *
 */

import _ from 'lodash';
import * as CategoryActionTypes from '../../actiontypes/category';
import { addCategory } from './categoriesReducerUtils';

const initialState = [
    {
        name: '日常'
    }, {
        name: '旅游度假',
        items: [
            { name: '2014南京行' },
            { name: '20115云南行' }
        ]
    }, {
        name: '居家',
        items: [
            { name: '新家装修2016年' }
        ]
    }
];

function projectCategoriesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY_PROJECT:
            return addCategory(state, action);
        case CategoryActionTypes.DELETE_CATEGORY_PROJECT:

            return state;

        case CategoryActionTypes.UPDATE_CATEGORY_PROJECT:
            return state;

        default:
            return state;
    }
}

export default projectCategoriesReducer;