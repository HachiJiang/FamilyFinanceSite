'use strict';

/*
 *
 * Debt member reducer
 *
 */

import * as DebtorActionTypes from '../../actiontypes/schema/debtor';

function debtorReducer(state = [], action = {}) {
    switch (action.type) {
        case DebtorActionTypes.ADD_DEBTOR:
            return [
                ...state,
                action.item
            ];

        case DebtorActionTypes.DELETE_DEBTOR:
            return state;

        case DebtorActionTypes.UPDATE_DEBTOR:
            return state;

        case DebtorActionTypes.RECEIVE_DEBTORS:
            return action.data;

        default:
            return state;
    }
}

export default debtorReducer;