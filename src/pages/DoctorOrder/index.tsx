import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getUserOrderList,
  getDoctorList,
  InsertDoctorOrder,
  getOrderLimi,
} from '@/services/ant-design-pro/api';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, message, Modal, Select, DatePicker } from 'antd';
import { userDelete } from '@/services/ant-design-pro/api';
import { useModel } from 'umi';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';

enum OrderTimeType {
  '8:00 ~ 9:00',
  '9:00 ~ 10:00',
  '10:00 ~ 11:00',
  '14:00 ~ 15:00',
  '15:00 ~ 16:00',
  '16:00 ~ 17:00',
}
// const OrderTimeArray = [
//   { label: '8:00 ~ 9:00', value: 0 },
//   { label: '9:00 ~ 10:00', value: 1 },
//   { label: '10:00 ~ 11:00', value: 2 },
//   { label: '14:00 ~ 15:00', value: 3 },
//   { label: '15:00 ~ 16:00', value: 4 },
//   { label: '16:00 ~ 17:00', value: 5 },
// ];

export default () => {
  const ref = useRef<any>(null);
  const formRef = useRef<any>(null);
  const [canOrder, setCanOrder] = useState<boolean>(false);
  const [orderTime] = useState<any>([]);
  const [orderParams, setOrderParams] = useState<any>(null);
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
  const getOrderTimeLimt = async (params: any) => {
    const msg = await getOrderLimi(params);
    console.log(msg);
  };
  useEffect(() => {
    getDoctorLists();
  }, []);

  useEffect(() => {
    if (orderParams && orderParams?.orderDoctor && orderParams?.orderDate) {
      getOrderTimeLimt({
        orderDoctor: orderParams.orderDoctor,
        orderDate: orderParams.orderDate,
      });
      setCanOrder(true);
    }
  }, [orderParams]);

  const handleDelete = async (userId: number) => {
    const msg = await userDelete({ userId });
    if (msg.msg === 'SUCCESS') {
      message.success('取消预约成功！');
      ref.current.reload();
    } else {
      message.error('取消预约失败！');
    }
  };
  const addDoctorOrder = () => {
    setShowAdd(!showAdd);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '预约编号',
      key: 'orderId',
      dataIndex: 'orderId',
    },
    {
      title: '预约医生ID',
      key: 'orderDoctor',
      dataIndex: 'orderDoctor',
    },
    {
      title: '医生名字',
      key: 'doctorName',
      dataIndex: 'doctorName',
      // valueEnum: userType
    },
    {
      title: '预约时段',
      key: 'orderTime',
      dataIndex: 'orderTime',
      valueEnum: OrderTimeType,
    },
    {
      title: '预约时间',
      key: 'orderDate',
      valueType: 'date',
      dataIndex: 'orderDate',
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
            onClick={() => handleDelete(value.orderId)}
            danger
          >
            取消
          </Button>
        );
      },
    },
  ];

  const getUserSelectList = async (data: {
    pageNum: number;
    pageSize: number;
    orderUser?: number;
  }): Promise<any> => {
    const msg = await getUserOrderList(data);
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
  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  // useEffect(() => {
  //   getUserSelectList({ pageNum: 1, pageSize: 1000 });
  // }, []);
  return (
    <PageContainer>
      <ProTable
        toolBarRender={() => [
          <Button
            key="primary"
            size="small"
            type="primary"
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
            orderUser: initialState?.currentUser?.userId,
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
        okButtonProps={{
          disabled: !canOrder,
        }}
        onCancel={() => {
          addDoctorOrder();
          formRef.current.resetFields([]);
          setCanOrder(false);
        }}
      >
        <Form
          ref={formRef}
          onValuesChange={(values) => {
            setOrderParams((s: any) => {
              return {
                ...s,
                ...values,
              };
            });
          }}
          onFinish={async (values: any) => {
            const msg = await InsertDoctorOrder({
              ...values,
              orderUser: initialState?.currentUser?.userId,
              createTime: moment().format('YYYY-MM-DD'),
            });
            if (msg.status === 200) {
              message.success('预约成功！');
            } else {
              message.error(`预约失败，${msg?.msg}`);
            }
            formRef.current.resetFields();
            setShowAdd(false);
            ref.current.reload();
          }}
        >
          <Form.Item name="orderDoctor" label="选择医生">
            <Select
              placeholder={'选择医生'}
              options={docList}
              style={{ width: 120 }}
            />
          </Form.Item>
          <Form.Item name="orderDate" label="选择预约时间">
            <DatePicker
              format="YYYY-MM-DD"
              mode="date"
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item name="orderTime" label="选择预约时段">
            <Select
              disabled={!canOrder}
              placeholder="选择预约时段"
              options={orderTime}
              style={{ width: 120 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
