import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getDoctorOrderList,
  getDoctorTreatMentList,
  InsertTreatment,
} from '@/services/ant-design-pro/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { treamentDelete } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
const { TextArea } = Input;

enum OrderTimeType {
  '8:00 ~ 9:00',
  '9:00 ~ 10:00',
  '10:00 ~ 11:00',
  '14:00 ~ 15:00',
  '15:00 ~ 16:00',
  '16:00 ~ 17:00',
}

export default () => {
  const { initialState } = useModel('@@initialState');
  const formRef = useRef<any>(null);
  const [orderList, setOrderList] = useState<any>([]);
  const ref = useRef<any>(null);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const handleDelete = async (treatmentId: number) => {
    const msg = await treamentDelete({ treatmentId });
    if (msg.msg === 'SUCCESS') {
      message.success('删除诊疗成功！');
      ref.current.reload();
    } else {
      message.error('删除诊疗失败！');
    }
  };
  const addUserOrder = () => {
    setShowAdd(!showAdd);
  };
  const getDoctorLists = useCallback(async () => {
    const msg = await getDoctorOrderList({
      pageNum: 1,
      pageSize: 20,
      orderDoctor: initialState?.currentUser?.userId,
    });
    if (msg?.data?.list) {
      setOrderList(
        msg.data.list.map((item: any) => {
          return {
            value: item?.orderId,
            label: `诊疗-${item?.orderId}`,
          };
        }),
      );
    } else {
      setOrderList([]);
    }
  }, [initialState?.currentUser?.userId]);
  useEffect(() => {
    getDoctorLists();
  }, [getDoctorLists]);
  const columns: ProColumns<any>[] = [
    {
      title: '诊断ID',
      key: 'treatmentId',
      dataIndex: 'treatmentId',
    },
    {
      title: '预约姓名',
      key: 'userName',
      dataIndex: 'userName',
      // valueEnum: userType
    },
    {
      title: '预约时间',
      key: 'orderDate',
      valueType: 'date',
      dataIndex: 'orderDate',
    },
    {
      title: '预约时段',
      key: 'orderTime',
      dataIndex: 'orderTime',
      valueEnum: OrderTimeType,
    },
    {
      title: '操作',
      key: 'operate',
      hideInSearch: true,
      render: (_, value: any) => {
        return (
          <Button
            size="small"
            onClick={() => handleDelete(value.treatmentId)}
            danger
          >
            删除
          </Button>
        );
      },
    },
  ];
  // const getUserSelectList = async (data: {
  //   pageNum: number;
  //   pageSize: number;
  //   orderDoctor?: number;
  // }): Promise<any> => {
  //   const msg = await getDoctorOrderList(data);
  //   // console.log(msg);
  //   if (msg.status === 200) {
  //     if (msg?.data?.list?.length) {
  //       const userList = msg?.data?.list.map((value: any, index: number) => {
  //         value.key = `key-${index}`;
  //         return value;
  //       });
  //       // console.log(userList)
  //       return userList;
  //     } else {
  //       return [];
  //     }
  //   } else {
  //     return [];
  //   }
  // };
  // useEffect(() => {
  //   getUserSelectList({ pageNum: 1, pageSize: 1000 });
  // }, []);
  return (
    <PageContainer>
      <ProTable
        toolBarRender={() => [
          <Button
            key="primary"
            type="primary"
            size="small"
            onClick={addUserOrder}
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
            orderUser: number;
          },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await getDoctorTreatMentList({
            pageNum: params.current,
            pageSize: params.pageSize,
            orderDoctor: initialState?.currentUser?.userId,
          });
          // console.log(msg, 1111)
          return {
            data:
              msg?.data?.list?.map((item: any, index: number) => {
                return {
                  ...item,
                  key: `${index}`,
                };
              }) || [],
            // success 请返回 true，
            success: msg?.data?.list?.length,
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
          addUserOrder();
          formRef.current.resetFields();
        }}
      >
        <Form
          ref={formRef}
          onFinish={async (values: any) => {
            const msg = await InsertTreatment({
              ...values,
              createTime: moment().format('YYYY-MM-DD'),
              orderDoctor: initialState?.currentUser?.userId,
            });
            if (msg.status === 200) {
              message.success('添加诊断结果成功！');
            } else {
              message.error('添加诊断结果失败！');
            }
            formRef.current.resetFields();
            ref.current.reload();
            setShowAdd(false);
          }}
        >
          <Form.Item name="orderId" label="选择诊疗单">
            <Select
              placeholder="诊疗单"
              style={{ width: 120 }}
              options={orderList}
            />
          </Form.Item>
          <Form.Item name="detail" label="诊疗结果">
            <TextArea rows={5} placeholder="请输入诊疗结果" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
