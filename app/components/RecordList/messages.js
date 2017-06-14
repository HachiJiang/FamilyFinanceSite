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
        defaultMessage: '流水清单'
    },
    totalIncome: {
        id: 'app.components.RecordList.totalIncome',
        defaultMessage: '总收入: '
    },
    totalOutcome: {
        id: 'app.components.RecordList.totalOutcome',
        defaultMessage: '总支出: '
    },
    totalDebt: {
        id: 'app.components.RecordList.totalOutcome',
        defaultMessage: '总负债: '
    },
    totalLoan: {
        id: 'app.components.RecordList.totalOutcome',
        defaultMessage: '总借出: '
    },
    unit: {
        id: 'app.components.RecordList.unit',
        defaultMessage: '(单位: RMB)'
    },
    income: {
        id: 'app.components.RecordList.type',
        defaultMessage: 'Type'
    }
});