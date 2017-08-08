'use strict';

/*
 * RecordList
 *
 * List finance records
 */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import SummaryBar from './SummaryBar';
import RecordGrid from '../RecordGrid';
import messages from './messages';

import { getTotals } from './selectors';

const RecordList = ({ range, records, deleteRecord, members, createEditor, onDateRangeChange }) => (
    <div className="record-list-container">
        <header className="record-list-header">
            <h2><FormattedMessage {...messages.header} /></h2>
            <SummaryBar
                range={ range }
                totals={ getTotals(records) }
                onDateRangeChange={ onDateRangeChange }
            />
        </header>
        <RecordGrid
            records={ records }
            deleteRecord={ deleteRecord }
            members={ members }
            createEditor={ createEditor }
        />
    </div>
);

RecordList.propTypes = {
    range: PropTypes.shape({
        fDate: PropTypes.string.isRequired,
        tDate: PropTypes.string.isRequired
    }).isRequired,
    records: PropTypes.array,
    members: PropTypes.array,
    deleteRecord: PropTypes.func.isRequired,
    createEditor: PropTypes.func.isRequired,
    onDateRangeChange: PropTypes.func.isRequired
};

export default RecordList;