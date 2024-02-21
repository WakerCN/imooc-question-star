import { baseFormLayouts } from '@/assets/styles';
import { useTitle } from '@/hooks/common';
import { ROUTE_PATH } from '@/routers';
import { GithubOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  Space,
  Typography
} from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { passwordRules, usernameRules } from './rules';
import { clearLoginInfo, getLoginInfo, rememberLoginInfo } from './storage';

interface Props {}

export interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export const Login: React.FC<Props> = () => {
  useTitle('登录');

  const navigate = useNavigate();

  const [form] = Form.useForm<LoginForm>();

  const handleJumptoRegister = () => {
    navigate(ROUTE_PATH.RESGISTER);
  };

  const handleLogin: FormProps['onFinish'] = (values: LoginForm) => {
    if (values.remember) {
      rememberLoginInfo(values);
    } else {
      clearLoginInfo();
    }
  };

  useEffect(() => {
    const info = getLoginInfo();
    if (info) {
      form.setFieldsValue(info);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['main-wrap']}>
      <div className={styles['login-box']}>
        <Typography.Title style={{ textAlign: 'center' }} level={3}>
          <Space>
            <GithubOutlined />
            登录
          </Space>
        </Typography.Title>
        <Form
          {...baseFormLayouts}
          form={form}
          onFinish={handleLogin}
          initialValues={{ remember: true }}
        >
          <Form.Item name={'username'} label="用户名" rules={usernameRules}>
            <Input placeholder={'请输入用户名'} />
          </Form.Item>
          <Form.Item name={'password'} label="密码" rules={passwordRules}>
            <Input.Password placeholder={'请输入密码'} />
          </Form.Item>
          <Form.Item
            name={'remember'}
            wrapperCol={{ offset: 6 }}
            valuePropName="checked"
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Button type="link" onClick={handleJumptoRegister}>
                注册新用户
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
