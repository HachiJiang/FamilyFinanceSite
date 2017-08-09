'use strict';

/*
 * AccountPage
 *
 * List and manage info of all the accounts
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import CategoryPanel from '../../components/CategoryPanel';

// Actions
import * as CategoryAccountActionCreators from '../../actions/schema/account';

// Selectors
import { getAccountCategories } from '../App/selectors';

import { DECIMAL_PRECISION } from '../../constants/Config';

const getBalanceTotal = cat => {
    const items = cat && cat.items;
    let total = 0;

    if (!items || items.length < 1) {
        return total;
    }

    _.forEach(items, item => {
        if (item && item.balance) {
            total += item.balance;
        }
    });
    return total.toFixed(DECIMAL_PRECISION);
};

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
            <div className='account-page'>
                <div className='account-kpi'>Account KPI</div>
                <CategoryPanel
                    categories={ accountCategories }
                    addCategory={ addAccountCategory }
                    deleteCategory={ deleteAccountCategory }
                    updateCategory={ updateAccountCategory }
                    getExtraInfo={ cat => getBalanceTotal(cat) }
                />
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