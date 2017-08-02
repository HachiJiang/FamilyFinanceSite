'use strict';

/*
 * OutcomePage
 *
 * List and manage info of all the categories of outcome
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import CategoryPanel from '../../components/CategoryPanel';

// Actions
import * as CategoryOutcomeActionCreators from '../../actions/schema/outcome';

// Selectors
import { getOutcomeCategories } from '../App/selectors';

class OutcomePage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        CategoryOutcomeActionCreators.fetchCategories(dispatch);
    }

    render() {
        const { dispatch, outcomeCategories } = this.props;

        // outcome
        const addOutcomeCategory = bindActionCreators(CategoryOutcomeActionCreators.addCategory, dispatch);
        const deleteOutcomeCategory = bindActionCreators(CategoryOutcomeActionCreators.deleteCategory, dispatch);
        const updateOutcomeCategory = bindActionCreators(CategoryOutcomeActionCreators.updateCategory, dispatch);

        return (
            <CategoryPanel
                categories={ outcomeCategories }
                addCategory={ addOutcomeCategory }
                deleteCategory={ deleteOutcomeCategory }
                updateCategory={ updateOutcomeCategory }
            />
        );
    }
}

OutcomePage.propTypes = {
    outcomeCategories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    outcomeCategories: getOutcomeCategories(state)
});

export default connect(mapStateToProps)(OutcomePage);