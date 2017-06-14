/*
 * RecordList
 *
 * List finance records
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import SummaryBar from './SummaryBar';
import RecordFilter from '../RecordFilter';
import RecordGrid from '../RecordGrid';
import messages from './messages';

import { getRecordListSortedByDate, getTotals } from './selectors';

const RecordList = ({ range, records, deleteRecord, members }) => (
    <div className="record-list-container">
        <header className="record-list-header">
            <h2><FormattedMessage {...messages.header} /></h2>
            <SummaryBar range={ range }
                        totals={ getTotals(records) }
                />
        </header>
        <RecordFilter />
        <RecordGrid records={ getRecordListSortedByDate(records) }
                    deleteRecord={ deleteRecord }
                    members={ members }
            />
    </div>
);

RecordList.propTypes = {
    range: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    }).isRequired,
    records: PropTypes.array,
    members: PropTypes.array,
    deleteRecord: PropTypes.func.isRequired
};

export default RecordList;