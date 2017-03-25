/*
 *
 * Income category reducer
 *
 */

import _ from 'lodash';

import * as CategoryActionTypes from '../../actiontypes/category';

const initialState = {
    '日常餐饮': ['正餐', '零食', '水果'],
    '行车交通': ['公共交通', '打车', '租车', '火车汽车', '机票'],
    '居家物业': ['日常用品', '数码电器', '水电煤', '物业费', '房租', '家具', '维修保养'],
    '交流通讯': ['手机', '上网', '快递'],
    '休闲娱乐': ['运动健身', '旅游度假', '娱乐'],
    '学习进修': ['软件工具', '书籍', '培训'],
    '护肤保养': ['理发', '护肤'],
    '服饰鞋帽': ['衣物', '饰品', '鞋帽包包'],
    '医疗保健': ['门诊', '住院'],
    '人情往来': ['礼品', '孝敬长辈', '聚餐请客'],
    '其他': []
};

function catIncomeReducer(state = initialState, action) {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY:
            const newCategory = action.name;
            return _.assign({}, state, {
                newCategory: []
            });
        default:
            return state;
    }
}

export default catIncomeReducer;