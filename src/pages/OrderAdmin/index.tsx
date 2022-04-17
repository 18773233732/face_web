import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getAdminOrderList } from '@/services/ant-design-pro/api';
import { useRef } from 'react';
import { Button, message } from 'antd';
import { userDelete } from '@/services/ant-design-pro/api';
import moment from 'moment';

enum OrderTimeType {
  '8:00 ~ 9:00',
  '9:00 ~ 10:00',
  '10:00 ~ 11:00',
  '14:00 ~ 15:00',
  '15:00 ~ 16:00',
  '16:00 ~ 17:00',
}

export default () => {
  const ref = useRef<any>(null);
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
      title: '预约编号',
      key: 'orderId',
      dataIndex: 'orderId',
    },
    {
      title: '预约用户',
      key: 'orderUser',
      dataIndex: 'orderUser',
    },
    {
      title: '预约医生',
      key: 'orderDoctor,',
      dataIndex: 'orderDoctor',
    },
    {
      title: '创建时间',
      key: 'createTime',
      valueType: 'date',
      dataIndex: 'createTime',
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
            disabled={
              value?.orderDate < moment().format('YYYY-MM-DD') ? true : false
            }
            onClick={() => handleDelete(value.orderId)}
            danger
          >
            删除
          </Button>
        );
      },
    },
  ];
  const getUserSelectList = async (data: {
    pageNum: number;
    pageSize: number;
    orderDoctor?: number;
  }): Promise<any> => {
    const msg = await getAdminOrderList(data);
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
  // useEffect(() => {
  //   getUserSelectList({ pageNum: 1, pageSize: 1000 });
  // }, []);
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
            orderUser: number;
          },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await getUserSelectList({
            pageNum: params.current,
            pageSize: params.pageSize,
          });
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
    </PageContainer>
  );
};
