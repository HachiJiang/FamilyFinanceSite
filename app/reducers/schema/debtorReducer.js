'use strict';

/*
 *
 * Debt member reducer
 *
 */
import * as DebtorActionTypes from '../../actiontypes/schema/debtor';
import * as categoriesReducerUtils from './categoriesReducerUtils';

function debtorReducer(state = [], action = {}) {
    switch (action.type) {
        case DebtorActionTypes.ADD_DEBTOR:
            return [
                ...state,
                action.item
            ];

        case DebtorActionTypes.DELETE_DEBTOR:
            return categoriesReducerUtils.deleteCategory(state, { _id: action._id });

        case DebtorActionTypes.UPDATE_DEBTOR:
            return categoriesReducerUtils.updateCategory(state, action.item);

        case DebtorActionTypes.RECEIVE_DEBTORS:
            return action.data;

        default:
            return state;
    }
}

export default debtorReducer;