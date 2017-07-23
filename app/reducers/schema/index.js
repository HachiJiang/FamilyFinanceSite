/**
 * Combine all reducers of basic categories.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';

import outcomeCategoriesReducer from './outcomeReducer';
import incomeCategoriesReducer from './incomeReducer';
import accountCategoriesReducer from './accountReducer';
import projectCategoriesReducer from './projectReducer';
import memberReducer from './memberReducer';
import debtMemberReducer from './debtorReducer';

const schemaReducer = combineReducers({
    outcomeCategories: outcomeCategoriesReducer,
    incomeCategories: incomeCategoriesReducer,
    accountCategories: accountCategoriesReducer,
    projectCategories: projectCategoriesReducer,
    members: memberReducer,
    debtors: debtMemberReducer
});

export default schemaReducer;