import { baseFormLayouts } from '@/assets/styles';
import { GithubOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routers';
import { passwordRules, usernameRules } from './rules';
import { useTitle } from '@/hooks/common';

interface Props {}

export const Register: React.FC<Props> = () => {
  useTitle('注册');

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(ROUTE_PATH.LOGIN);
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
        <Form {...baseFormLayouts}>
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
              <Button type="primary" htmlType="submit">
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
