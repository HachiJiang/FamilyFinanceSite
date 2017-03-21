/*
 * RecordPage
 *
 * List finance records
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import NavLink from '../../components/NavLink';
import RecordEditor from '../../components/RecordEditor';
import RecordList from '../../components/RecordList';
import { getRecordList, getRange, getTotals } from './selectors';

import './scss/index.scss';

const RecordPage = props => {
    return (
        <div>
            <RecordEditor />
            <RecordList range={ props.range }
                        records={ props.records }
                        totalIncome={ props.totals.income }
                        totalOutcome={ props.totals.outcome }
                />
        </div>
    );
};

RecordPage.propTypes = {
    range: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    }).isRequired,
    records: PropTypes.array.isRequired,
    totals: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    records: getRecordList(state),
    range: getRange(state),
    totals: getTotals(state)
});

export default connect(mapStateToProps)(RecordPage);
