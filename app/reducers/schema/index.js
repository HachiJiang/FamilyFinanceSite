/**
 * Combine all reducers of basic categories.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';

import outcomeCategoriesReducer from './outcomeCategoriesReducer';
import incomeCategoriesReducer from './incomeCategoriesReducer';
import accountCategoriesReducer from './accountCategoriesReducer';
import projectCategoriesReducer from './projectCategoriesReducer';
import memberReducer from './memberReducer';
import debtMemberReducer from './debtMemberReducer';

const schemaReducer = combineReducers({
    outcomeCategories: outcomeCategoriesReducer,
    incomeCategories: incomeCategoriesReducer,
    accountCategories: accountCategoriesReducer,
    projectCategories: projectCategoriesReducer,
    members: memberReducer,
    debtMembers: debtMemberReducer
});

export default schemaReducer;