import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getUserAskList,
  getDoctorList,
  InsertDoctorAsk,
} from '@/services/ant-design-pro/api';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Form,
  message,
  Modal,
  Select,
  Input,
  Space,
  Tag,
  Drawer,
} from 'antd';
import { askDelete } from '@/services/ant-design-pro/api';
import { useModel } from 'umi';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default () => {
  const ref = useRef<any>(null);
  const [drawerVisible, setDrawerVisible] = useState<any>(null);
  const formRef = useRef<any>(null);
  const onDrawerClose = () => {
    setDrawerVisible(null);
  };
  const [docList, setDocList] = useState<any>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');
  const getDoctorLists = async () => {
    const msg = await getDoctorList({ pageNum: 1, pageSize: 20 });
    if (msg?.data) {
      setDocList(
        msg.data.map((item: any, index: number) => {
          return {
            value: item?.userId,
            label: `医生-${index}-${item?.userName}`,
          };
        }),
      );
    } else {
      setDocList([]);
    }
  };
  useEffect(() => {
    getDoctorLists();
  }, []);
  const handleDelete = async (askId: number) => {
    const msg = await askDelete({ askId });
    if (msg.msg === 'SUCCESS') {
      message.success('删除预约成功！');
      ref.current.reload();
    } else {
      message.error('删除预约失败！');
    }
  };
  const addDoctorOrder = () => {
    setShowAdd(!showAdd);
  };
  const handleShowDrawer = (values: string | null) => {
    setDrawerVisible(values);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '咨询编号',
      key: 'askId',
      dataIndex: 'askId',
    },
    {
      title: '咨询医生ID',
      key: 'answerUserId',
      dataIndex: 'answerUserId',
    },
    {
      title: '医生名字',
      key: 'userName',
      dataIndex: 'userName',
      // valueEnum: userType
    },
    {
      title: '咨询内容',
      key: 'askContent',
      dataIndex: 'askContent',
    },
    {
      title: '是否回复',
      key: 'answer',
      dataIndex: 'answerContent',
      render: (_, values: any) => {
        if (values?.answerContent) {
          return <Tag color="green">已回复</Tag>;
        }
        return <Tag color="red">未回复</Tag>;
      },
    },
    {
      title: '咨询时间',
      key: 'askTime',
      dataIndex: 'askTime',
    },
    {
      title: '操作',
      key: 'operate',
      hideInSearch: true,
      render: (_, value: any) => {
        return (
          <Space direction="horizontal">
            <Button
              size="small"
              onClick={() => handleDelete(value.askId)}
              danger
            >
              删除
            </Button>
            <Button
              size="small"
              type="primary"
              ghost
              disabled={!value?.answerContent}
              onClick={() => handleShowDrawer(value.answerContent)}
            >
              查看回复
            </Button>
          </Space>
        );
      },
    },
  ];

  const getUserSelectList = async (data: {
    pageNum: number;
    pageSize: number;
    askUserId?: number;
  }): Promise<any> => {
    const msg = await getUserAskList(data);
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
  return (
    <PageContainer>
      <ProTable
        toolBarRender={() => [
          <Button
            key="primary"
            type="primary"
            size="small"
            onClick={addDoctorOrder}
          >
            <PlusOutlined />
            新建
          </Button>,
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
            askUserId: initialState?.currentUser?.userId,
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
        title="新建预约"
        onOk={() => {
          formRef.current.submit();
        }}
        onCancel={() => {
          addDoctorOrder();
          formRef.current.resetFields();
        }}
      >
        <Form
          ref={formRef}
          onFinish={async (values: any) => {
            const msg = await InsertDoctorAsk({
              ...values,
              askUserId: initialState?.currentUser?.userId,
              askTime: moment().format('YYYY-MM-DD'),
            });
            if (msg.status === 200) {
              message.success('添加咨询成功！');
            } else {
              message.error(`添加咨询失败，${msg?.msg}`);
            }
            formRef.current.resetFields();
            setShowAdd(false);
            ref.current.reload();
          }}
        >
          <Form.Item name="answerUserId" label="选择医生">
            <Select
              placeholder={'选择医生'}
              options={docList}
              style={{ width: 120 }}
            />
          </Form.Item>
          <Form.Item name="askContent" label="咨询内容">
            {/* <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} /> */}
            <TextArea placeholder="请输入咨询内容" />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="回复详情"
        placement="right"
        onClose={onDrawerClose}
        visible={drawerVisible}
      >
        {drawerVisible}
      </Drawer>
    </PageContainer>
  );
};
