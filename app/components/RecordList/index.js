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

const RecordList = ({ range, records, deleteRecord, schema, createEditor, onDateRangeChange }) => (
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
            schema={ schema }
            createEditor={ createEditor }
        />
    </div>
);

RecordList.propTypes = {
    schema: PropTypes.shape({
        outcomeCategories: PropTypes.arrayOf(PropTypes.object),
        incomeCategories: PropTypes.arrayOf(PropTypes.object),
        accountCategories: PropTypes.arrayOf(PropTypes.object),
        projectCategories: PropTypes.arrayOf(PropTypes.object),
        members: PropTypes.arrayOf(PropTypes.object),
        debtors: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    range: PropTypes.object.isRequired,
    records: PropTypes.array,
    deleteRecord: PropTypes.func.isRequired,
    createEditor: PropTypes.func.isRequired,
    onDateRangeChange: PropTypes.func.isRequired
};

export default RecordList;