import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, message, Radio, Upload } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import { useRef, useState } from 'react';
import { register } from '../services';

export default () => {
  const ref = useRef<any>();
  const [fileBase64, setFileBase64] = useState<any>('');
  function getBase64(img: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => setFileBase64(reader.result));
    reader.readAsDataURL(img);
  }
  const normFile = (e: any) => {
    if (!Array.isArray(e)) {
      if (e.fileList[0] && e.fileList[0].status === 'done') {
        getBase64(e.fileList[0]?.originFileObj);
      } else {
        setFileBase64('');
      }
    } else {
      setFileBase64('');
    }
  };
  return (
    <PageContainer>
      <Card style={{ width: 450 }}>
        <Form
          ref={ref}
          labelAlign="left"
          labelCol={{ span: 6 }}
          name="basic"
          wrapperCol={{ span: 16 }}
          onFinish={async (values: any) => {
            if (values && fileBase64 !== '') {
              // console.log(values, fileBase64m);
              const base64Data = fileBase64.substring(
                fileBase64.indexOf(',') + 1,
              );
              const msg = await register({ ...values, picBase64: base64Data });
              if (msg.success && msg.code === 200) {
                message.success('用户注册成功！');
                setFileBase64('');
                ref.current?.resetFields?.();
              } else {
                message.error(`用户注册失败，${msg.errorMessage}`);
              }
            }
          }}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: '请输入你的用户名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            initialValue={'1989'}
            help="初始密码1989"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="人脸图片"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              maxCount={1}
              action=""
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
            >
              <Button icon={<UploadOutlined />}>选择人脸图片</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入你的手机号!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="学院"
            name="college"
            rules={[{ required: true, message: '请输入你的学院!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="省份"
            name="provinces"
            rules={[{ required: true, message: '请输入你的省份!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="城市"
            name="city"
            rules={[{ required: true, message: '请输入你的城市!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="地区"
            name="area"
            rules={[{ required: true, message: '请输入你的地区!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            initialValue={0}
            rules={[{ required: true, message: '请选择你的账户类型!' }]}
            label="账户类型"
          >
            <Radio.Group>
              <Radio value={0}>学生</Radio>
              <Radio value={1}>教师</Radio>
              <Radio value={2}>管理员</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};
