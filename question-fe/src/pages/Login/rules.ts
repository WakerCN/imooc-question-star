import { FormRule } from 'antd';

export const usernameRules: FormRule[] = [
  {
    required: true,
    message: '用户名不能为空'
  },
  {
    pattern: /^\w+$/,
    message: '只能是字母数组下划线'
  }
];

export const passwordRules: FormRule[] = [
  {
    required: true,
    message: '密码不能为空'
  }
];
