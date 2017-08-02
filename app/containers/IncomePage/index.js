'use strict';

/*
 * IncomePage
 *
 * List and manage info of all the categories of income
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import CategoryPanel from '../../components/CategoryPanel';

// Actions
import * as CategoryIncomeActionCreators from '../../actions/schema/income';

// Selectors
import { getIncomeCategories } from '../App/selectors';

class IncomePage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        CategoryIncomeActionCreators.fetchCategories(dispatch);
    }

    render() {
        const { dispatch, incomeCategories } = this.props;

        // income
        const addIncomeCategory = bindActionCreators(CategoryIncomeActionCreators.addCategory, dispatch);
        const deleteIncomeCategory = bindActionCreators(CategoryIncomeActionCreators.deleteCategory, dispatch);
        const updateIncomeCategory = bindActionCreators(CategoryIncomeActionCreators.updateCategory, dispatch);

        return (
            <CategoryPanel
                categories={ incomeCategories }
                addCategory={ addIncomeCategory }
                deleteCategory={ deleteIncomeCategory }
                updateCategory={ updateIncomeCategory }
            />
        );
    }
}

IncomePage.propTypes = {
    incomeCategories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    incomeCategories: getIncomeCategories(state)
});

export default connect(mapStateToProps)(IncomePage);