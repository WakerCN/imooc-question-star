import { baseFormLayouts } from '@/assets/styles';
import { message } from '@/components/AntdStatic';
import { useTitle } from '@/hooks/common';
import { ROUTE_PATH } from '@/routers';
import { UserService } from '@/services/user';
import { GithubOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Input, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { passwordRules, usernameRules } from './rules';

interface Props {}

interface RegisterForm {
  username: string;
  password: string;
  confirm: string;
}

export const Register: React.FC<Props> = () => {
  useTitle('注册');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(ROUTE_PATH.LOGIN);
  };

  const { runAsync: resgiter, loading } = useRequest(
    async (params) => UserService.register(params),
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功');
        navigate(ROUTE_PATH.LOGIN);
      }
    }
  );
  const handleRegister = async (values: RegisterForm) => {
    await resgiter({ username: values.username, password: values.password });
  };

  return (
    <div className={styles['main-wrap']}>
      <div className={styles['login-box']}>
        <Typography.Title style={{ textAlign: 'center' }} level={3}>
          <Space>
            <GithubOutlined />
            注册
          </Space>
        </Typography.Title>
        <Form {...baseFormLayouts} onFinish={handleRegister}>
          <Form.Item name={'username'} label="用户名" rules={usernameRules}>
            <Input placeholder={'请输入用户名'} />
          </Form.Item>
          <Form.Item name={'password'} label="密码" rules={passwordRules}>
            <Input.Password placeholder={'请输入密码'} />
          </Form.Item>
          <Form.Item
            name={'confirm'}
            label="确认密码"
            dependencies={['password']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码输入不一致'));
                }
              })
            ]}
          >
            <Input.Password placeholder={'请再次输入密码'} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                注册
              </Button>
              <Button type="link" onClick={handleLogin}>
                已有账户，登录
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
