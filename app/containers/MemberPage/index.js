'use strict';

/*
 * MemberPage
 *
 * List and manage info of all the members and debtors
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import SingleCatPanel from '../../components/base/SingleCatPanel';

// Actions
import * as MemberActionCreators from '../../actions/schema/member';
import * as DebtorActionCreators from '../../actions/schema/debtor';

// Selectors
import { getMembers, getDebtors } from '../App/selectors';

class MemberPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        MemberActionCreators.fetchMembers(dispatch);
        DebtorActionCreators.fetchDebtors(dispatch);
    }

    render() {
        const { dispatch, members, debtors } = this.props;

        // member
        const addMember = bindActionCreators(MemberActionCreators.addMember, dispatch);
        const deleteMember = bindActionCreators(MemberActionCreators.deleteMember, dispatch);
        const updateMember = bindActionCreators(MemberActionCreators.updateMember, dispatch);

        // debtor
        const addDebtor = bindActionCreators(DebtorActionCreators.addDebtor, dispatch);
        const deleteDebtor = bindActionCreators(DebtorActionCreators.deleteDebtor, dispatch);
        const updateDebtor = bindActionCreators(DebtorActionCreators.updateDebtor, dispatch);

        return (
            <div className='member-page'>
                <SingleCatPanel
                    cat={ {
                        name: '成员管理',
                        items: members
                    } }
                    addItem={ addMember }
                    deleteItem={ deleteMember }
                    updateItem={ updateMember }
                />
                <SingleCatPanel
                    cat={ {
                        name: '债务相关人管理',
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

MemberPage.propTypes = {
    members: PropTypes.array.isRequired,
    debtors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    members: getMembers(state),
    debtors: getDebtors(state)
});

export default connect(mapStateToProps)(MemberPage);