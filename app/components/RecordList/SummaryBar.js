/*
 * SummaryBar
 *
 * Summary header for record list
 */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const SummaryBar = props => (
    <div className="record-summary">
        <div>{ props.range.from } - { props.range.to }</div>
        <ul className="record-summary-kpi">
            <li>
                <FormattedMessage {...messages.totalIncome} />
                <span className="record-income-val">{ props.totalIncome }</span>
            </li>
            <li>
                <FormattedMessage {...messages.totalOutcome} />
                <span className="record-outcome-val">{ props.totalOutcome }</span>
            </li>
            <li><FormattedMessage {...messages.unit} /></li>
        </ul>
    </div>
);

SummaryBar.propTypes = {
    totalIncome: PropTypes.number.isRequired,
    totalOutcome: PropTypes.number.isRequired,
    range: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    }).isRequired
};

export default SummaryBar;