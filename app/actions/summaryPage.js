'use strict';

/**
 * Fetch outcome amount by day
 * @param dispatch
 * @param range
 */
export const fetchOutcomeByDay = (dispatch, { fDate, tDate }) => {
    dispatch(RecordActionCreators.fetchRecords(fDate, tDate));
};