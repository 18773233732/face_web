import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Space } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, Link, useModel } from 'umi';
import { logon } from '@/services/ant-design-pro/api';
import './index.less';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';

import styles from './index.less';
import Footer from '@/components/Footer';

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
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>(
    {} as any,
  );
  const { setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await logon({ ...values, type: 1 });
      if (msg.data?.userId) {
        message.success('注册成功');
        // window.localStorage.setItem('token', msg.data.token);
        // await fetchUserInfo();
        setUserLoginState(msg);
        // setInitialState({ currentUser: msg.data });
        localStorage.setItem('userData', JSON.stringify(msg.data));
        await setInitialState((s) => ({
          ...s,
          currentUser: msg.data,
        }));
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        // const { query } = history.location;
        // const { redirect } = query as { redirect: string };
        history.push('/');
        return;
      } else {
        message.error(msg.msg);
      }
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      message.error('注册失败，请重试！');
    }
  };
  const { msg } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title="牙科诊所预约系统注册"
          subTitle={'牙科诊所预约系统'}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {msg === 'login_failed' && (
            <LoginMessage content={'账户或密码错误'} />
          )}
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
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
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
          </>
          <Space style={{ marginBottom: 20 }}>
            <Link to="/user/login" style={{ float: 'right' }}>
              已有密码，立即登录
            </Link>
          </Space>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
