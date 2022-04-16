import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import {
  ProFormText,
  LoginForm,
  ProFormRadio,
  ProFormDatePicker,
} from '@ant-design/pro-form';
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
    <LoginForm
      title="牙科诊所预约系统注册"
      subTitle={'牙科诊所预约系统'}
      submitter={{
        // 配置按钮文本
        searchConfig: {
          submitText: '注册',
        },
      }}
      onFinish={async (values) => {
        await handleSubmit(values as API.LoginParams);
      }}
    >
      {msg !== 'SUCCESS' && <LoginMessage content={msg} />}
      <>
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
        <ProFormText
          name="userName"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'用户名字'}
          rules={[
            {
              required: true,
              message: '请输入用户名字!',
            },
          ]}
        />
        <ProFormRadio.Group
          name="gender"
          initialValue={0}
          label="性别"
          options={[
            {
              label: '男',
              value: 0,
            },
            {
              label: '女',
              value: 1,
            },
          ]}
        />
        <ProFormText
          name="address"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'地址'}
          rules={[
            {
              required: true,
              message: '请输入地址!',
            },
          ]}
        />
        <ProFormText
          name="phone"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'手机'}
          rules={[
            {
              required: true,
              message: '请输入手机!',
            },
          ]}
        />
        <ProFormDatePicker
          name="birthday"
          fieldProps={{
            size: 'large',
          }}
          placeholder={'生日'}
          rules={[
            {
              required: true,
              message: '请输入生日!',
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
      </>
    </LoginForm>
  );
};

export default Login;
