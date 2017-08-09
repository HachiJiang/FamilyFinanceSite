'use strict';

/*
 * DebtorPage
 *
 * List and manage info of all the debtors
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import SingleCatPanel from '../../components/base/SingleCatPanel';

// Actions
import * as DebtorActionCreators from '../../actions/schema/debtor';

// Selectors
import { getDebtors } from '../App/selectors';

class DebtorPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        DebtorActionCreators.fetchDebtors(dispatch);
    }

    render() {
        const { dispatch, debtors } = this.props;

        // debtor
        const addDebtor = bindActionCreators(DebtorActionCreators.addDebtor, dispatch);
        const deleteDebtor = bindActionCreators(DebtorActionCreators.deleteDebtor, dispatch);
        const updateDebtor = bindActionCreators(DebtorActionCreators.updateDebtor, dispatch);

        return (
            <div className='debtor-page'>
                <SingleCatPanel
                    cat={ {
                        name: '债务管理',
                        items: debtors
                    } }
                    addItem={ addDebtor }
                    deleteItem={ deleteDebtor }
                    updateItem={ updateDebtor }
                />
            </div>
        );
    }
}

DebtorPage.propTypes = {
    debtors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    debtors: getDebtors(state)
});

export default connect(mapStateToProps)(DebtorPage);