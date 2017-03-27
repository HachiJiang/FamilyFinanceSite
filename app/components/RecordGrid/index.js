/*
 * RecordGrid
 *
 * Grid table for records
 */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Record from '../RecordList/Record';

const RecordGrid = ({ records }) => (
    <div className="record-table">
        <div className="record-table-header">
            <div className="cell">#</div>
            <div className="cell">[类别]</div>
            <div className="cell">[账户]</div>
            <div className="cell">[金额]</div>
            <div className="cell">[项目]</div>
            <div className="cell">[成员]</div>
            <div className="cell">[备注]</div>
        </div>
        <div className="record-table-body">
        {
            (!records || records.length < 1) ?
                <FormattedMessage { ...messages.empty } /> :
                records.map(record => (
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
    </div>
);

RecordGrid.propTypes = {
    records: PropTypes.array
};

export default RecordGrid;