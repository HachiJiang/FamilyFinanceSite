/*
 *
 * Income category reducer
 *
 */

import _ from 'lodash';

import * as CategoryActionTypes from '../../actiontypes/category';

const initialState = [
    {
        name: '日常餐饮',
        items: ['正餐', '零食', '水果']
    }, {
        name: '行车交通',
        items: ['公共交通', '打车', '租车', '火车汽车', '机票']
    }, {
        name: '居家物业',
        items: ['日常用品', '数码电器', '水电煤', '物业费', '房租', '家具', '维修保养']
    }, {
        name: '交流通讯',
        items: ['手机', '上网', '快递']
    }, {
        name: '休闲娱乐',
        items: ['运动健身', '旅游度假', '娱乐']
    }, {
        name: '学习进修',
        items: ['软件工具', '书籍', '培训']
    }, {
        name: '护肤保养',
        items: ['理发', '护肤']
    }, {
        name: '服饰鞋帽',
        items: ['衣物', '饰品', '鞋帽包包']
    }, {
        name: '医疗保健',
        items: ['门诊', '住院']
    }, {
        name: '人情往来',
        items: ['礼品', '孝敬长辈', '聚餐请客']
    }, {
        name: '其他',
        items: []
    }
];

function catOutcomeReducer(state = initialState, action) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY:
            const newCategory = action.name;
            return _.assign({}, state, {
                newCategory: []
            });
        case CategoryActionTypes.DELETE_CATEGORY:

        default:
            return state;
    }
}

export default catOutcomeReducer;