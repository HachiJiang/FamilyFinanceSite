/*
 * AccountPage
 *
 * List info of all the accounts
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class AccountPage extends React.PureComponent {
    render() {
        return (
            <h1>
                <FormattedMessage {...messages.header} />
            </h1>
        );
    }
}
