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

import './scss/index.scss';

const RecordList = props => (
    <div className="record-list-container">
        <header className="record-list-header">
            <h2><FormattedMessage {...messages.header} /></h2>
            <SummaryBar range={ props.range }
                        totalIncome={ props.totalIncome }
                        totalOutcome={ props.totalOutcome } />
        </header>
        <RecordFilter />
        <RecordGrid records={ props.records }/>
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