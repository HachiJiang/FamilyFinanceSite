'use strict';

/**
 * Config for tabs
 * 共 10 项设置: 支出分类, 收入分类, 转出账户, 转入账户, 项目, 债权人, 成员, 金额, 日期, 备注
 */
import * as EnumRecordType from '../../constants/EnumRecordType';

const TABS = [
    {
        value: EnumRecordType.OUTCOME,
        title: '[支出]',
        flags: [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1], // indicate whether the tab needs corresponding control,
        subTitles: ['[分类]', '', '[支出账户]', '', '[项目]', ''] // indicate whether the tab needs corresponding control
    }, {
        value: EnumRecordType.INCOME,
        title: "[收入]",
        flags: [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        subTitles: ['', '[分类]', '', '[收入账户]', '[项目]', '', '成员', '税前工资', '税前奖金']
    }, {
        value: EnumRecordType.TRANSFER,
        title: "[转账]",
        flags: [0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1],
        subTitles: ['', '', '[转出账户]', '[转入账户]', '[项目]', '']
    }, {
        value: EnumRecordType.BORROW,
        title: "[借入]",
        flags: [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
        subTitles: ['', '', '', '[借入账户]', '[项目]', '[债务相关人]']
    }, {
        value: EnumRecordType.LEND,
        title: "[借出]",
        flags: [0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
        subTitles: ['', '', '[借出账户]', '', '[项目]', '[债务相关人]']
    }, {
        value: EnumRecordType.REPAY,
        title: "[还款]",
        flags: [0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
        subTitles: ['', '', '[支出账户]', '', '[项目]', '[债务相关人]']
    }, {
        value: EnumRecordType.COLLECT_DEBT,
        title: "[收债]",
        flags: [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
        subTitles: ['', '', '', '[存入账户]', '[项目]', '[债务相关人]']
    }
];

export default TABS;