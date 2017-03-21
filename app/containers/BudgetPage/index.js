/*
 * BudgetPage
 *
 * Manage budget plans
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class BudgetPage extends React.PureComponent {
    render() {
        return (
            <h1>
                <FormattedMessage {...messages.header} />
            </h1>
        );
    }
}
