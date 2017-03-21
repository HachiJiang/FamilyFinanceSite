/*
 * RecordList Messages
 *
 * This contains all the text for the RecordList component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    empty: {
        id: 'app.components.RecordList.empty',
        defaultMessage: 'No records'
    },
    header: {
        id: 'app.components.RecordList.header',
        defaultMessage: 'Record List'
    },
    totalIncome: {
        id: 'app.components.RecordList.totalIncome',
        defaultMessage: 'Total Income: '
    },
    totalOutcome: {
        id: 'app.components.RecordList.totalOutcome',
        defaultMessage: 'Total Outcome: '
    },
    unit: {
        id: 'app.components.RecordList.unit',
        defaultMessage: '(Unit: RMB)'
    },
    income: {
        id: 'app.components.RecordList.type',
        defaultMessage: 'Type'
    }
});