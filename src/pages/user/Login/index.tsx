import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import {
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  LoginForm,
} from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';

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
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log(userInfo, 1111);
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.data?.userData?.id) {
        message.success('登录成功');
        window.localStorage.setItem('token', msg.data.token);
        await fetchUserInfo();
        setUserLoginState(msg);
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
          title="校园疫情校测系统"
          subTitle={'hnust 基于人脸识别的校园疫情监测系统'}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            '其他登录方式',
            <AlipayCircleOutlined
              key="AlipayCircleOutlined"
              className={styles.icon}
            />,
            <TaobaoCircleOutlined
              key="TaobaoCircleOutlined"
              className={styles.icon}
            />,
            <WeiboCircleOutlined
              key="WeiboCircleOutlined"
              className={styles.icon}
            />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码登录'} />
            <Tabs.TabPane key="mobile" tab={'手机号登录'} />
          </Tabs>

          {errorMessage === 'login_failed' && (
            <LoginMessage content={'账户或密码错误(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin or user'}
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
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}

          {errorMessage === 'mobile_code_error' && (
            <LoginMessage content="验证码错误" />
          )}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await getFakeCaptcha({
                    phone,
                  });
                  if (result === false) {
                    return;
                  }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

// import styles from './index.less';
// import type { FC } from 'react';
// import { Cascader } from 'antd';
// import provinces from 'china-division/dist/provinces.json';
// import cities from 'china-division/dist/cities.json';
// import areas from 'china-division/dist/areas.json';

// type AntdInputProps = {
//   placeholder?: string;
//   onChangeProps?: (v: any) => void;
//   allowClear?: boolean;
// };

// const AntdCascader: FC<AntdInputProps> = (props) => {
//   const {
//     placeholder = '请选择省市区',
//     onChangeProps,
//     allowClear = true,
//   } = props;

//   // console.log(cities);

//   // areas.forEach(
//   //   (area: { cityCode: string; name: string; code: any }, id: number) => {
//   //     const matchCity = cities.filter(
//   //       (city: { code: string }) => city.code === area.cityCode,
//   //     )[0];
//   //     if (matchCity) {
//   //       matchCity.children = matchCity.children || [];
//   //       matchCity.children.push({
//   //         label: area.name,
//   //         value: area.code,
//   //         id,
//   //       });
//   //     }
//   //   },
//   // );

//   // cities.forEach(
//   //   (
//   //     city: {
//   //       provinceCode: any;
//   //       name: string;
//   //       string: any;
//   //       children: any;
//   //       code?: string;
//   //     },
//   //     id: number,
//   //   ) => {
//   //     const matchProvince = provinces.filter(
//   //       (province: { code: string }) => province.code === city.provinceCode,
//   //     )[0];
//   //     if (matchProvince) {
//   //       matchProvince.children = matchProvince.children || [];
//   //       matchProvince.children.push({
//   //         label: city.name,
//   //         value: city.code,
//   //         id,
//   //         children: city.children,
//   //       });
//   //     }
//   //   },
//   // );

//   const options = provinces.map(
//     (province: { name: any; code: any; children: any }, id: number) => ({
//       label: province.name,
//       value: province.code,
//       id,
//       children: province.children,
//     }),
//   );

//   // console.log('options',options);

//   return (
//     <div className={styles['cascader-wrap']}>
//       <Cascader
//         options={options}
//         showSearch
//         placeholder={placeholder}
//         onChange={onChangeProps}
//         allowClear={allowClear}
//       />
//     </div>
//   );
// };

// export default AntdCascader;

// import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// export default () => {
//   const props = {
//     name: 'file',
//     customRequest(file: any) {
//       console.log(file.file);
//     },
//     headers: {
//       authorization: 'authorization-text',
//     },
//     onChange(info: any) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };
//   return (
//     <>
//       <Upload {...props}>
//         <Button icon={<UploadOutlined />}>Click to Upload</Button>
//       </Upload>
//     </>
//   );
// };
