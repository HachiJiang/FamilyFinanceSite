'use strict';

/*
 * RecordGrid
 *
 * Grid table for records
 */
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import selfMessages from './messages';
import { Table, Popconfirm, message } from 'antd';

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
        sorter: (a, b) => moment(a.date).isAfter(moment(b.date)) ? 1 : -1
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
        title: '支出账户',
        dataIndex: 'accountFrom',
        key: 'accountFrom'
    }, {
        title: '收入账户',
        dataIndex: 'accountTo',
        key: 'accountTo'
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
            <Popconfirm
                title='确定删除么?'
                onConfirm={ () => {
                    props.deleteRecord(record._id);
                } }
                onCancel={ () => { message.error('取消删除') } }>
                <a href="#">删除</a>
            </Popconfirm>
        )
    }];
}

class RecordGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bordered: false,
            loading: false,
            pagination: false,
            size: 'default',
            expandedRowRender: ({ record }) => props.createEditor(record._raw),  // use raw record for editing
            showHeader: true,
            scroll: undefined
        };
    }

    render() {
        const { records } = this.props;

        return (
            <div className="record-table">
                {
                    (!records || records.length < 1) ?
                        <FormattedMessage { ...selfMessages.empty } /> :
                        <Table {...this.state} columns={ getColumns(this.props) } dataSource={ getDataRows(records) } />
                }
            </div>
        );
    }
}

RecordGrid.propTypes = {
    records: PropTypes.array,
    members: PropTypes.array,
    deleteRecord: PropTypes.func.isRequired,
    createEditor: PropTypes.func.isRequired
};

export default RecordGrid;