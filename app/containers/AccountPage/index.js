'use strict';

/*
 * AccountPage
 *
 * List info of all the accounts
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import AccountPanel from '../../components/AccountPanel';

// Actions
import * as CategoryAccountActionCreators from '../../actions/schema/account';

// Selectors
import { getAccountCategories } from '../App/selectors';

class AccountPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        CategoryAccountActionCreators.fetchCategories(dispatch);
    }

    render() {
        const { dispatch, accountCategories } = this.props;

        const addAccountCategory = bindActionCreators(CategoryAccountActionCreators.addCategory, dispatch);
        const deleteAccountCategory = bindActionCreators(CategoryAccountActionCreators.deleteCategory, dispatch);
        const updateAccountCategory = bindActionCreators(CategoryAccountActionCreators.updateCategory, dispatch);

        return (
            <div>
                <div className='account-kpi'>Account KPI</div>
                <div className='account-details'>
                    <AccountPanel
                        accountCategories={ accountCategories }
                        addAccountCategory={ addAccountCategory }
                        deleteAccountCategory={ deleteAccountCategory }
                        updateAccountCategory={ updateAccountCategory }
                    />
                </div>
            </div>
        );
    }
}

AccountPage.propTypes = {
    accountCategories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    accountCategories: getAccountCategories(state)
});

export default connect(mapStateToProps)(AccountPage);