import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getArticleList,
  InsertArticle,
  UpdateArticle,
} from '@/services/ant-design-pro/api';
import { useRef, useState } from 'react';
import { Button, Form, message, Typography, Modal, Input, Space } from 'antd';
import { DeleteArticle } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
const { Paragraph } = Typography;
const { TextArea } = Input;
export default () => {
  const ref = useRef<any>(null);
  const form = useRef<any>(null);
  const formAdd = useRef<any>(null);
  const [showView, setShowView] = useState<any>(null);
  const [showUpdate, setShowUpdate] = useState<any>(null);
  const { initialState } = useModel('@@initialState');
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const handleView = (item: any) => {
    setShowView(item);
  };
  const handleUpdate = (item: any) => {
    console.log(item);
    setShowUpdate(item);
  };
  const handleDelete = async (articleId: number) => {
    const msg = await DeleteArticle({ articleId });
    if (msg.msg === 'SUCCESS') {
      message.success('删除文章成功！');
      ref.current.reload();
    } else {
      message.error('删除文章失败！');
    }
  };
  const addUserOrder = () => {
    setShowAdd(!showAdd);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '文章编号',
      key: 'articleId',
      dataIndex: 'articleId',
    },
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: '摘要',
      key: 'abstractContent',
      dataIndex: 'abstractContent',
      // valueEnum: userType
    },
    {
      title: '内容',
      key: 'content',
      dataIndex: 'content',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: '创建医生',
      key: 'createUser',
      dataIndex: 'createUser',
    },
    {
      title: '操作',
      key: 'delete',
      render: (_, item) => {
        return (
          <Space direction="horizontal">
            {initialState?.currentUser?.type !== 1 ? (
              <>
                <Button
                  danger
                  ghost
                  size="small"
                  onClick={() => handleDelete(item?.articleId)}
                >
                  删除
                </Button>
                <Button
                  type="primary"
                  size="small"
                  ghost
                  onClick={() => handleUpdate(item)}
                >
                  修改
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                size="small"
                ghost
                onClick={() => handleView(item)}
              >
                查看
              </Button>
            )}
          </Space>
        );
      },
    },
  ];
  const getUserSelectList = async (data: {
    pageNum: number;
    pageSize: number;
  }): Promise<any> => {
    const msg = await getArticleList(data);
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
        toolBarRender={() => [
          initialState?.currentUser?.type === 2 ? (
            <Button
              key="primary"
              type="primary"
              size="small"
              onClick={addUserOrder}
            >
              <PlusOutlined />
              新建
            </Button>
          ) : undefined,
        ]}
        search={false}
        actionRef={ref}
        columns={columns}
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
        visible={showAdd}
        title="新建文章"
        onCancel={addUserOrder}
        onOk={() => {
          form.current.submit();
        }}
      >
        <Form
          ref={form}
          onFinish={async (values: any) => {
            // console.log();
            const msg = await InsertArticle({
              ...showUpdate,
              ...values,
              createUser: initialState?.currentUser?.userId,
              createTime: moment().format('YYYY-MM-DD'),
            });
            if (msg.status === 200) {
              message.success('插入医学文章成功！');
              form.current.resetFields();
            } else {
              message.error(msg.msg);
            }
            setShowAdd(false);
            ref.current.reload();
          }}
        >
          <Form.Item name="title" label="标题">
            <Input />
          </Form.Item>
          <Form.Item name="abstractContent" label="摘要">
            <Input />
          </Form.Item>
          <Form.Item name="content" label="内容">
            <TextArea rows={8} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          <>
            医学文章：
            <span style={{ fontSize: 12 }}>
              {showView?.createTime}
              {' 创建者：'}
              {showView?.createUser}
            </span>
          </>
        }
        visible={showView}
        centered
        onOk={() => setShowView(null)}
        onCancel={() => setShowView(null)}
      >
        <Paragraph>{showView?.abstractContent}</Paragraph>
        <Paragraph>{showView?.content}</Paragraph>
        {/* <div>{showView.</div> */}
      </Modal>
      <Modal
        title="修改文章"
        visible={showUpdate}
        onOk={() => {
          formAdd.current.submit();
        }}
        onCancel={() => setShowUpdate(null)}
      >
        <Form
          ref={formAdd}
          onFinish={async (values: any) => {
            // console.log();
            const msg = await UpdateArticle({
              ...values,
              createUser: initialState?.currentUser?.userId,
              articleId: showUpdate?.articleId,
            });
            if (msg.status === 200) {
              message.success('更新医学文章成功！');
              formAdd.current.resetFields();
            } else {
              message.error(msg.msg);
            }
            setShowUpdate(false);
            ref.current.reload();
          }}
        >
          <Form.Item name="title" label="标题">
            <Input placeholder={showUpdate?.title} />
          </Form.Item>
          <Form.Item name="abstractContent" label="摘要">
            <Input placeholder={showUpdate?.abstractContent} />
          </Form.Item>
          <Form.Item name="content" label="内容">
            <TextArea rows={8} placeholder={showUpdate?.content} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
