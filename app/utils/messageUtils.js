'use strict';

import { message } from 'antd';

export const success = () => message.success('操作成功!');
export const fail = () => message.error('请求失败!');