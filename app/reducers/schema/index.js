/**
 * Combine all reducers of basic categories.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';

import catOutcomeReducer from './catOutcomeReducer.js';

const schemaReducer = combineReducers({
    catOutcome: catOutcomeReducer
});

export default schemaReducer;