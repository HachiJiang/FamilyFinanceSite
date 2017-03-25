/*
 * RecordPage
 *
 * List finance records
 */

// Libs
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Components
import RecordEditor from '../../components/RecordEditor';
import RecordList from '../../components/RecordList';

// Selectors
import { getCatOutcome, getRecordList, getRange, getTotals } from './selectors';

const RecordPage = props => (
    <div>
        <RecordEditor catOutcome={ props.catOutcome }/>
        <RecordList range={ props.range }
                    records={ props.records }
                    totalIncome={ props.totals.income }
                    totalOutcome={ props.totals.outcome }
            />
    </div>
);

RecordPage.propTypes = {
    range: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    }).isRequired,
    records: PropTypes.array.isRequired,
    totals: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    catOutcome: getCatOutcome(state),
    records: getRecordList(state),
    range: getRange(state),
    totals: getTotals(state)
});

export default connect(mapStateToProps)(RecordPage);
