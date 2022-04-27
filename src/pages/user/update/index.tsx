import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import './index.less';
import { useModel } from 'umi';
import { message, Upload } from 'antd';
import { updateUserInfo } from '@/pages/UsersTable/services';
import { currentUser as getCurrentUserInfo } from '@/services';
import { useState } from 'react';
import type { RcFile } from 'antd/lib/upload';

const picTmp = 'http://124.221.107.247:8080/';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [imgUrl, setImgUrl] = useState<string>('');
  const getUserInfo = async () => {
    const data = await getCurrentUserInfo();
    if (data.code === 200 && data.success === true) {
      setImgUrl(`${picTmp}${data.data.userInfo.pic}?${Date.now()}`);
      return data.data.userInfo;
    }
    return {};
  };
  const handleFinish = async (params: any) => {
    const data = await updateUserInfo({ ...params });
    const currentUser = {
      ...initialState?.currentUser,
      ...params,
    };
    if (data.code === 200) {
      await setInitialState((s: any) => {
        return {
          ...s,
          currentUser,
        };
      });
      message.success('更新基本信息成功');
    } else {
      message.error(data.errorMessage);
    }
  };
  return (
    <PageContainer>
      <ProCard title="个人中心" split="vertical" bordered headerBordered>
        <ProCard title="个人信息" colSpan="60%">
          <ProForm
            labelCol={{ span: 4 }}
            request={getUserInfo}
            labelAlign="left"
            layout="horizontal"
            onFinish={handleFinish}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
            }}
            hideRequiredMark
          >
            <ProFormText name="id" disabled hidden />
            <ProFormText
              label="用户名"
              width="md"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入用户名字!',
                },
              ]}
            />
            <ProFormText
              width="md"
              label="省份"
              name="provinces"
              rules={[
                {
                  required: true,
                  message: '请输入所在省份!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="city"
              label="城市"
              rules={[
                {
                  required: true,
                  message: '请输入所在城市!',
                },
              ]}
            />
            <ProFormText
              width="md"
              label="地区"
              name="area"
              rules={[
                {
                  required: true,
                  message: '请输入所在地区!',
                },
              ]}
            />
            <ProFormText
              width="md"
              label="学院"
              name="college"
              rules={[
                {
                  required: true,
                  message: '请输入所属学院！',
                },
              ]}
            />
            <ProFormText
              width="md"
              label="手机号"
              name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
              ]}
            />
          </ProForm>
        </ProCard>
        <ProCard title="人脸信息">
          <Upload
            action="http://124.221.107.247:8080/api/user/uploadpic"
            method="POST"
            name="image"
            maxCount={1}
            headers={{
              Authorization: `Bearer ${
                window.localStorage.getItem('token') || ''
              }`,
            }}
            beforeUpload={(file: RcFile) => {
              const isJpgOrPng =
                file.type === 'image/jpeg' ||
                file.type === 'image/jpg' ||
                file.type === 'image/png';
              if (!isJpgOrPng) {
                message.error('只支持jpg、jpeg、png文件!');
              }
              const isLt2M = file.size / 1024 <= 500;
              if (!isLt2M) {
                message.error('文件不能超过500K!');
              }
              return isJpgOrPng && isLt2M;
            }}
            onChange={({ file }) => {
              if (file.status === 'done') {
                // 上传成功
                message.success('上传人脸图片成功！');
                setImgUrl(
                  `${picTmp}${initialState?.currentUser?.pic}?${Date.now()}`,
                );
              } else if (file.status === 'error') {
                // 上传失败
                message.error('请检查图片中有清晰的人脸图片！');
              }
            }}
          >
            <div className="avatar">
              <img src={imgUrl} alt="avatar" />
            </div>
          </Upload>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
