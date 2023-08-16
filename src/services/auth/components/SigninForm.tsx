'use client';

import { emailRule, requiredRule } from '@/utils/antd/rulesMessage';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { signIn } from 'next-auth/react';
import { TAuthSigninPayload } from '../entities/request';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function SigninForm() {
  const [form] = useForm();
  const onFinish = async (values: TAuthSigninPayload) => {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/backoffice',
    });
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: '300px', margin: 'auto', padding: '3rem 0' }}
      >
        <Form.Item>
          <Typography.Title level={2}>Sign in</Typography.Title>
        </Form.Item>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item name="email" rules={[emailRule, requiredRule]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item name="password" rules={[requiredRule]}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign in
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
}
