'use strict';

/*
 * ProjectPage
 *
 * List and manage info of all the categories of project
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import CategoryPanel from '../../components/CategoryPanel';

// Actions
import * as CategoryProjectActionCreators from '../../actions/schema/project';

// Selectors
import { getProjectCategories } from '../App/selectors';

class ProjectPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        CategoryProjectActionCreators.fetchCategories(dispatch);
    }

    render() {
        const { dispatch, projectCategories } = this.props;

        // project
        const addProjectCategory = bindActionCreators(CategoryProjectActionCreators.addCategory, dispatch);
        const deleteProjectCategory = bindActionCreators(CategoryProjectActionCreators.deleteCategory, dispatch);
        const updateProjectCategory = bindActionCreators(CategoryProjectActionCreators.updateCategory, dispatch);

        return (
            <CategoryPanel
                categories={ projectCategories }
                addCategory={ addProjectCategory }
                deleteCategory={ deleteProjectCategory }
                updateCategory={ updateProjectCategory }
            />
        );
    }
}

ProjectPage.propTypes = {
    projectCategories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projectCategories: getProjectCategories(state)
});

export default connect(mapStateToProps)(ProjectPage);