/*
 * RecordGrid
 *
 * Grid table for records
 */
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import messages from './messages';
import { Table } from 'antd';
import RecordEditor from '../RecordEditor';

import { getDataRows, getRecordTypeFilters, getMemberFilters } from './selectors';

/**
 * Get Columns
 * @param {Object} props
 * @returns {Array}
 */
function getColumns(props) {
    return [{
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => {
            return moment(a.date).isAfter(moment(b.date)) ? 1 : -1;
        }
    }, {
        title: '类型',
        dataIndex: 'text',
        key: 'text',
        filters: getRecordTypeFilters(),
        onFilter: (value, record) => record.type === value
    }, {
        title: '类别',
        dataIndex: 'category',
        key: 'category'
    }, {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount - b.amount
    }, {
        title: '成员',
        dataIndex: 'member',
        key: 'member',
        filters: getMemberFilters(props.members),
        onFilter: (value, record) => record.member === value
    }, {
        title: '项目',
        dataIndex: 'project',
        key: 'project'
    }, {
        title: '备注',
        dataIndex: 'tips',
        key: 'tips'
    }, {
        title: '#',
        key: 'action',
        render: (text, record) => (
            <span>
              <a href="#">编辑</a>
              <span className="ant-divider" />
              <a href="#" onClick={ () => props.deleteRecord(record._id) }>删除</a>
            </span>
        )
    }];
}

const expandedRowRender = () => {
    return <RecordEditor />;
};

class RecordGrid extends Component {
    state = {
        bordered: true,
        loading: false,
        pagination: false,
        size: 'default',
        expandedRowRender,
        showHeader: true,
        scroll: undefined
    };

    render() {
        const { records } = this.props;

        return (
            <div className="record-table">
                {
                    (!records || records.length < 1) ?
                        <FormattedMessage { ...messages.empty } /> :
                        <Table {...this.state} columns={ getColumns(this.props) } dataSource={ getDataRows(records) } />
                }
            </div>
        );
    }
}

RecordGrid.propTypes = {
    records: PropTypes.array,
    members: PropTypes.array,
    deleteRecord: PropTypes.func.isRequired
};

export default RecordGrid;