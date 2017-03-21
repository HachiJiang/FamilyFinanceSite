/*
 * ProfilePage
 *
 * Manage all the dashboards
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class ProfilePage extends React.PureComponent {
    render() {
        return (
            <h1>
                <FormattedMessage {...messages.header} />
            </h1>
        );
    }
}
