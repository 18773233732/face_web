import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText, ProFormRadio } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { logon } from '@/services/ant-design-pro/api';
import './index.less';

import styles from './index.less';
import { history } from 'umi';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLogonState, setUserLogonState] = useState<any>({ msg: 'SUCCESS' });
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await logon({ ...values });
      if (msg.status === 200) {
        message.success('注册成功');
        setUserLogonState(msg);
        history.push('/');
        return;
      } else {
        setUserLogonState(msg);
      }
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };
  const { msg } = userLogonState;
  return (
    <ProCard title="用户注册" split="vertical" bordered headerBordered>
      <ProCard colSpan="50%">
        <ProForm
          layout="vertical"
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {
              children: '更新基本信息',
            },
          }}
          hideRequiredMark
        >
          {msg !== 'SUCCESS' && <LoginMessage content={msg} />}
          <ProCard>
            <ProFormText
              name="userId"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'用户Id'}
              rules={[
                {
                  required: true,
                  message: '请输入用户Id!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <ProFormRadio.Group
              name="type"
              initialValue={1}
              label="用户类型"
              options={[
                {
                  label: '管理员',
                  value: 0,
                },
                {
                  label: '用户',
                  value: 1,
                },
                {
                  label: '医生',
                  value: 2,
                },
              ]}
            />
          </ProCard>
        </ProForm>
      </ProCard>
    </ProCard>
  );
};

export default Login;
