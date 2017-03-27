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

const RecordList = ({ range, totalIncome, totalOutcome, records }) => (
    <div className="record-list-container">
        <header className="record-list-header">
            <h2><FormattedMessage {...messages.header} /></h2>
            <SummaryBar range={ range }
                        totalIncome={ totalIncome }
                        totalOutcome={ totalOutcome } />
        </header>
        <RecordFilter />
        <RecordGrid records={ records }/>
    </div>
);

RecordList.propTypes = {
    range: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    }).isRequired,
    records: PropTypes.array,
    totalIncome: PropTypes.number.isRequired,
    totalOutcome: PropTypes.number.isRequired
};

export default RecordList;