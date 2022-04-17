import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getDoctorAskList,
  AnserDoctorAsk,
} from '@/services/ant-design-pro/api';
import { useRef, useState } from 'react';
import { Button, Form, message, Modal, Input, Space } from 'antd';
import { askDelete } from '@/services/ant-design-pro/api';
import { useModel } from 'umi';
import moment from 'moment';
const { TextArea } = Input;

export default () => {
  const ref = useRef<any>(null);
  const formRef = useRef<any>(null);
  const [showAdd, setShowAdd] = useState<any>(null);
  const { initialState } = useModel('@@initialState');
  const handleDelete = async (askId: number) => {
    const msg = await askDelete({ askId });
    if (msg.msg === 'SUCCESS') {
      message.success('删除预约成功！');
      ref.current.reload();
    } else {
      message.error('删除预约失败！');
    }
  };
  const addDoctorOrder = (askId: number | null) => {
    setShowAdd(askId);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '咨询编号',
      key: 'askId',
      dataIndex: 'askId',
    },
    {
      title: '咨询用户ID',
      key: 'askUserId',
      dataIndex: 'askUserId',
    },
    {
      title: '咨询用户',
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
              onClick={() => addDoctorOrder(value.askId)}
              ghost
            >
              回复
            </Button>
          </Space>
        );
      },
    },
  ];

  const getUserSelectList = async (data: {
    pageNum: number;
    pageSize: number;
    answerUserId?: number;
  }): Promise<any> => {
    const msg = await getDoctorAskList(data);
    if (msg.status === 200) {
      if (msg?.data?.list?.length) {
        const userList = msg?.data?.list.map((value: any, index: number) => {
          value.key = `key-${index}`;
          return value;
        });
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
            answerUserId: initialState?.currentUser?.userId,
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
        visible={!!showAdd}
        title="回复"
        onOk={() => {
          formRef.current.submit();
        }}
        onCancel={() => {
          addDoctorOrder(null);
          formRef.current.resetFields();
        }}
      >
        <Form
          ref={formRef}
          onFinish={async (values: any) => {
            const msg = await AnserDoctorAsk({
              ...values,
              // askUserId: initialState?.currentUser?.userId,
              askId: showAdd,
              answerTime: moment().format('YYYY-MM-DD'),
            });
            if (msg.status === 200) {
              message.success('回复成功！');
            } else {
              message.error(`回复失败，${msg?.msg}`);
            }
            formRef.current.resetFields();
            setShowAdd(false);
            ref.current.reload();
          }}
        >
          <Form.Item name="answerContent" label="回复内容">
            {/* <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} /> */}
            <TextArea placeholder="请输入回复内容" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
