/*
 * RecordGrid
 *
 * Grid table for records
 */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Record from '../RecordList/Record';
import './scss/index.scss';

const RecordGrid = props => (
    <div className="record-list-table">
        <div className="record-header">
            <div>[Type]</div>
            <div>[Category]</div>
            <div>[Account]</div>
            <div>[Amount]</div>
            <div>[Project]</div>
            <div>[Member]</div>
            <div>[Tips]</div>
        </div>
        {
            (!props.records || props.records.length < 1) ?
                <FormattedMessage {...messages.empty} /> :
                props.records.map(record => (
                    <Record key={ record.id }
                            id={ record.id }
                            type={ record.type }
                            category={ record.category }
                            account={ record.account }
                            amount={ record.amount}
                            project={ record.project }
                            member={ record.member }
                            tips={ record.tips }
                        />
                ))
        }
    </div>
);

RecordGrid.propTypes = {
    records: PropTypes.array
};

export default RecordGrid;