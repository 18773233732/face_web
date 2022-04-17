// import { useModel } from 'umi';
import ProForm, {
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import styles from './index.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import { message } from 'antd';
import { userUpdate } from '@/services/ant-design-pro/api';
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
  </>
);
export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  // const { currentUser } = initialState;
  const currentUser = initialState?.currentUser;
  const handleFinish = async (params: any) => {
    const data = await userUpdate(params);
    await setInitialState((s: any) => {
      return {
        ...s,
        currentUser: {
          ...currentUser,
          ...params,
        },
      };
    });
    localStorage.setItem(
      'userData',
      JSON.stringify({
        ...currentUser,
        ...params,
      }),
    );
    if (data.status === 200) {
      message.success('更新基本信息成功');
      history.push('/');
    } else {
      message.error(data.msg);
    }
  };
  return (
    <PageContainer>
      <ProCard title="个人中心" split="vertical" bordered headerBordered>
        <ProCard title="个人信息" colSpan="50%">
          <ProForm
            layout="vertical"
            onFinish={handleFinish}
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
            initialValues={{
              ...initialState?.currentUser,
            }}
            hideRequiredMark
          >
            <ProFormText
              width="md"
              disabled
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
              width="md"
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
              width="md"
              name="gender"
              // initialValue={0}
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
              width="md"
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
              width="md"
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
              width="md"
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
              width="md"
              name="type"
              // initialValue={1}
              label="用户类型"
              disabled
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
          </ProForm>
        </ProCard>
        <ProCard title="头像">
          <AvatarView
            avatar={
              'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
            }
          />
        </ProCard>
      </ProCard>
      {/* <div>
            </div> */}
    </PageContainer>
  );
};
