'use strict';

/*
 * MemberPage
 *
 * List and manage info of all the members
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
import { getMembers } from '../App/selectors';

class MemberPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        MemberActionCreators.fetchMembers(dispatch);
    }

    render() {
        const { dispatch, members } = this.props;

        // member
        const addMember = bindActionCreators(MemberActionCreators.addMember, dispatch);
        const deleteMember = bindActionCreators(MemberActionCreators.deleteMember, dispatch);
        const updateMember = bindActionCreators(MemberActionCreators.updateMember, dispatch);

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
            </div>
        );
    }
}

MemberPage.propTypes = {
    members: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    members: getMembers(state)
});

export default connect(mapStateToProps)(MemberPage);