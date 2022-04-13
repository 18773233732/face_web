import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm, ProFormRadio } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';

import styles from './index.less';

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

  // const fetchUserInfo = async () => {
  //   // const userInfo = await initialState?.fetchUserInfo?.();
  //   const userInfo = await currentUser({
  //     "userId":
  //   })
  //   console.log(userInfo, 1111);
  //   if (userInfo) {
  //     await setInitialState((s) => ({
  //       ...s,
  //       currentUser: userInfo,
  //     }));
  //   }
  // };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.data?.userData?.userId) {
        message.success('登录成功');
        // window.localStorage.setItem('token', msg.data.token);
        // await fetchUserInfo();
        setUserLoginState(msg);
        setInitialState({ currentUser: msg.data.userData });
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        // const { query } = history.location;
        // const { redirect } = query as { redirect: string };
        // console.log(msg.data.token);
        history.push('/');
        return;
      }
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };
  const { errorMessage } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
          {errorMessage === 'login_failed' && (
            <LoginMessage content={'账户或密码错误'} />
          )}
          <>
            <ProFormText
              name="username"
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
            <ProFormRadio.Group
              name="type"
              initialValue={1}
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
      </div>
      <Footer />
    </div>
  );
};

export default Login;
