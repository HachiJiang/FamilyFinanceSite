/*
 * RecordGrid
 *
 * Grid table for records
 */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Record from '../RecordList/Record';

const RecordGrid = ({ records, deleteRecord }) => (
    <div className="record-table">
        <div className="record-table-body">
        {
            (!records || records.length < 1) ?
                <FormattedMessage { ...messages.empty } /> :
                records.map(record => (
                    <Record key={ record.id }
                            id={ record.id }
                            type={ record.type }
                            amount={ record.amount}
                            member={ record.member }
                            tips={ record.tips }
                            category={ record.category }
                            accountTo={ record.accountTo }
                            accountFrom={ record.accountFrom }
                            debtMember={ record.debtMember }
                            project={ record.project }
                            date={ record.date }
                            deleteRecord={ deleteRecord }
                        />
                ))
        }
        </div>
    </div>
);

RecordGrid.propTypes = {
    records: PropTypes.array,
    deleteRecord: PropTypes.func.isRequired
};

export default RecordGrid;