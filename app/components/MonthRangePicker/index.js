/**
 *
 * MonthRangePicker.js
 *
 */

import React, { Component, PropTypes } from 'react';

// Components
import { DatePicker } from 'antd';

const { MonthPicker } = DatePicker;

class MonthRangePicker extends Component {
    state = {
        endOpen: false
    };

    disabledStartDate(startValue) {
        const endValue = this.props.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate(endValue) {
        const startValue = this.props.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    handleStartOpenChange(open) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange(open) {
        this.setState({ endOpen: open });
    }

    render() {
        const { startValue, endValue, onStartChange, onEndChange } = this.props;

        return (
            <div>
                <MonthPicker
                    disabledDate={ this.disabledStartDate }
                    value={ startValue }
                    placeholder="Start"
                    onChange={ onStartChange }
                    onOpenChange={this.handleStartOpenChange}
                />
                <MonthPicker
                    disabledDate={this.disabledEndDate}
                    value={ endValue }
                    placeholder="End"
                    onChange={ onEndChange }
                    open={ this.state.endOpen }
                    onOpenChange={ this.handleEndOpenChange }
                />
            </div>
        )
    }
}

MonthRangePicker.propTypes = {
    startValue: PropTypes.string,
    endValue: PropTypes.string,
    onStartChange: PropTypes.func,
    onEndChange: PropTypes.func
};

export default MonthRangePicker;