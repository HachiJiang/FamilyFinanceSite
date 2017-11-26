'use strict';

/*
 * SummaryBar
 *
 * Summary header for record list
 */
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

class SummaryBar extends Component {

    render() {
        const { totals } = this.props;

        return (
            <ul className="record-summary-kpi">
                <li>
                    <span>总收入: </span>
                    <span className="record-positive-val">{ totals.income }</span>
                </li>
                <li>
                    <span>总支出: </span>
                    <span className="record-negative-val">{ totals.outcome }</span>
                </li>
                <li>
                    {
                        totals.debt > 0 ?
                            <span>净欠款: </span>
                            :
                            <span>净还款: </span>
                    }
                    <span>{ Math.abs(totals.debt) }</span>
                </li>
                <li>
                    {
                        totals.loan > 0 ?
                            <span>净借出: </span>
                            :
                            <span>净借入: </span>
                    }
                    <span>{ Math.abs(totals.loan) }</span>
                </li>
                <li><FormattedMessage {...messages.unit} /></li>
            </ul>
        );
    }
}

SummaryBar.propTypes = {
    totals: PropTypes.shape({
        income: PropTypes.number.isRequired,
        outcome: PropTypes.number.isRequired,
        debt: PropTypes.number.isRequired,
        loan: PropTypes.number.isRequired
    }).isRequired
};

export default SummaryBar;