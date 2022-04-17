import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { selectUserList } from '@/services/ant-design-pro/api';
import { useRef, useState } from 'react';
import { Button, Form, Input, message, Modal, Radio } from 'antd';
import { userDelete } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { logon } from '@/services/ant-design-pro/api';

enum userType {
  '管理员',
  '用户',
  '医生',
}

export default () => {
  const ref = useRef<any>(null);
  const formRef = useRef<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleDelete = async (userId: number) => {
    const msg = await userDelete({ userId });
    if (msg.msg === 'SUCCESS') {
      message.success('删除用户成功！');
      ref.current.reload();
    } else {
      message.error('删除用户失败！');
    }
  };
  const columns: ProColumns<any>[] = [
    {
      title: '用户名称',
      key: 'userName',
      hideInSearch: true,

      dataIndex: 'userName',
    },
    {
      title: '用户ID',
      hideInSearch: true,

      key: 'userId',
      dataIndex: 'userId',
    },
    {
      title: '用户类型',
      key: 'type',
      dataIndex: 'type',
      hideInSearch: true,

      valueEnum: userType,
    },
    {
      title: '生日',
      key: 'birthday',
      hideInSearch: true,

      dataIndex: 'birthday',
    },
    {
      title: '地址',
      key: 'address',
      hideInSearch: true,
      dataIndex: 'address',
    },
    {
      title: '操作',
      key: 'operate',
      hideInSearch: true,
      render: (_, value: any) => {
        return (
          <Button
            size="small"
            type="link"
            onClick={() => handleDelete(value.userId)}
            danger
          >
            删除
          </Button>
        );
      },
    },
  ];
  const addUser = () => {
    setShowModal(!showModal);
  };
  const getUserSelectList = async (data: {
    pageNum: number;
    pageSize: number;
  }): Promise<any> => {
    const msg = await selectUserList(data);
    // console.log(msg);
    if (msg.status === 200) {
      if (msg?.data?.list?.length) {
        const userList = msg?.data?.list.map((value: any, index: number) => {
          value.key = `key-${index}`;
          return value;
        });
        // console.log(userList)
        return userList;
      } else {
        return [];
      }
    } else {
      return [];
    }
  };
  // useEffect(() => {
  //   getUserSelectList({ pageNum: 1, pageSize: 1000 });
  // }, []);
  return (
    <PageContainer>
      <ProTable
        search={false}
        actionRef={ref}
        columns={columns}
        toolBarRender={() => [
          <Button key="primary" type="primary" onClick={addUser}>
            <PlusOutlined />
            添加用户
          </Button>,
        ]}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: {
            pageSize: number;
            current: number;
          },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await getUserSelectList({
            pageNum: params.current,
            pageSize: params.pageSize,
          });
          // console.log(msg, 1111)
          return {
            data: msg,
            // success 请返回 true，
            success: msg.length,
            // 不然 table 会停止解析数据，即使有数据
            // success: boolean,
            // 不传会使用 data 的长度，如果是分页一定要传
            // total: number,
          };
        }}
      />
      <Modal
        width={350}
        centered
        title="添加用户"
        onOk={() => ref.current?.submit?.()}
        onCancel={addUser}
        visible={showModal}
      >
        <Form
          ref={formRef}
          onFinish={async (values: any) => {
            const data = await logon(values);
            if (data.status === 200) {
              message.success('注册成功！');
              ref.current.reload();
            } else {
              message.error('注册失败!');
            }
            formRef.current.resetFields();
            setShowModal(false);
          }}
        >
          <Form.Item name="userId">
            <Input placeholder="用户ID" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item name="type" initialValue={1}>
            <Radio.Group>
              <Radio value={0}>管理员</Radio>
              <Radio value={1}>用户</Radio>
              <Radio value={2}>医生</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
