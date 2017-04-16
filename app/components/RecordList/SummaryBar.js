/*
 * SummaryBar
 *
 * Summary header for record list
 */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const SummaryBar = ({ range, totals }) => (
    <div className="record-summary">
        <div>{ range.from } - { range.to }</div>
        <ul className="record-summary-kpi">
            <li>
                <FormattedMessage {...messages.totalIncome} />
                <span className="record-positive-val">{ totals.income }</span>
            </li>
            <li>
                <FormattedMessage {...messages.totalOutcome} />
                <span className="record-negative-val">{ totals.outcome }</span>
            </li>
            <li>
                <FormattedMessage {...messages.totalDebt} />
                <span className="record-negative-val">{ totals.debt }</span>
            </li>
            <li>
                <FormattedMessage {...messages.totalLoan} />
                <span className="record-positive-val">{ totals.loan }</span>
            </li>
            <li><FormattedMessage {...messages.unit} /></li>
        </ul>
    </div>
);

SummaryBar.propTypes = {
    totals: PropTypes.shape({
        income: PropTypes.number.isRequired,
        outcome: PropTypes.number.isRequired,
        debt: PropTypes.number.isRequired,
        loan: PropTypes.number.isRequired
    }).isRequired,
    range: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    }).isRequired
};

export default SummaryBar;