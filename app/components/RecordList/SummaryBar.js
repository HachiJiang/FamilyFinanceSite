'use strict';

/*
 * SummaryBar
 *
 * Summary header for record list
 */
import moment from 'moment';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { DatePicker } from 'antd';
import messages from './messages';
import { CONSUME_DATE_FORMAT } from '../../constants/Config';

const { RangePicker } = DatePicker;

class SummaryBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fDate: null,
            tDate: null
        };
    }

    onChange(dates, dateStrs) {
        const fDate = dateStrs[0];
        const tDate = dateStrs[1];

        if (fDate && tDate) {
            this.setState({ fDate: dates[0], tDate: dates[1] });
            this.props.onDateRangeChange(fDate, tDate);
        }
    }

    render() {
        const { range: { fDate, tDate }, totals } = this.props;
        const currentFDate = this.state.fDate || moment(fDate, CONSUME_DATE_FORMAT);
        const currentTDate = this.state.tDate || moment(tDate, CONSUME_DATE_FORMAT);

        return (
            <div className="record-summary">
                <RangePicker
                    format={ CONSUME_DATE_FORMAT }
                    allowClear={ false }
                    value={[ currentFDate, currentTDate]}
                    onChange={ (dates, dateStrs) => this.onChange(dates, dateStrs) }
                />
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
    }
}

SummaryBar.propTypes = {
    totals: PropTypes.shape({
        income: PropTypes.number.isRequired,
        outcome: PropTypes.number.isRequired,
        debt: PropTypes.number.isRequired,
        loan: PropTypes.number.isRequired
    }).isRequired,
    range: PropTypes.shape({
        fDate: PropTypes.string.isRequired,
        tDate: PropTypes.string.isRequired
    }).isRequired,
    onDateRangeChange: PropTypes.func.isRequired
};

export default SummaryBar;