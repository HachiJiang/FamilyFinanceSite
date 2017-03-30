/**
 * Config for tabs
 * 共 10 项设置: 支出分类, 收入分类, 转出账户, 转入账户, 金额, 成员, 债权人, 日期, 项目, 备注
 */

const TABS = [
    {
        title: '[支出]',
        flags: [1, 0, 1, 0, 1, 1, 0], // indicate whether the tab needs corresponding control,
        subTitles: ['[分类]', '', '[支出账户]', '', '[项目]', '[成员]', ''] // indicate whether the tab needs corresponding control
    }, {
        title: "[收入]",
        flags: [0, 1, 1, 0, 1, 1, 0],
        subTitles: ['', '[分类]', '[收入账户]', '', '[项目]','[成员]', '']
    }, {
        title: "[转账]",
        flags: [0, 0, 1, 1, 1, 1, 0],
        subTitles: ['', '', '[转出账户]', '[转入账户]', '[项目]','[成员]', '']
    }, {
        title: "[借入]",
        flags: [0, 0, 0, 1,1, 1, 1],
        subTitles: ['', '', '', '[借入账户]', '[项目]','[成员]', '[债务相关人]']
    }, {
        title: "[借出]",
        flags: [0, 0, 1, 0, 1, 1, 1],
        subTitles: ['', '', '[借出账户]', '', '[项目]','[成员]', '[债务相关人]']
    }, {
        title: "[还款]",
        flags: [0, 0, 1, 0, 1, 1, 1],
        subTitles: ['', '', '[支出账户]', '', '[项目]','[成员]', '[债务相关人]']
    }, {
        title: "[收债]",
        flags: [0, 0, 0, 1, 1, 1, 1],
        subTitles: ['', '', '', '[存入账户]', '[项目]','[成员]', '[债务相关人]']
    }
];

export default TABS;