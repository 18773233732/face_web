import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getUserTreatMentList } from '@/services/ant-design-pro/api';
import { useRef, useState } from 'react';
import { Button, Drawer } from 'antd';
import { useModel } from 'umi';

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
  const [drawerShow, setDrawShow] = useState<any>(null);
  const ref = useRef<any>(null);
  const handleShowDrawer = (values: string | null) => {
    setDrawShow(values);
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
            ghost
            type="primary"
            onClick={() => handleShowDrawer(value?.detail || null)}
          >
            查看
          </Button>
        );
      },
    },
  ];
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
          const msg = await getUserTreatMentList({
            pageNum: params.current,
            pageSize: params.pageSize,
            orderUser: initialState?.currentUser?.userId,
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
            success: msg.length,
            // 不然 table 会停止解析数据，即使有数据
            // success: boolean,
            // 不传会使用 data 的长度，如果是分页一定要传
            // total: number,
          };
        }}
      />
      <Drawer
        title="诊疗结果"
        onClose={() => setDrawShow(null)}
        visible={drawerShow}
      >
        {drawerShow}
      </Drawer>
    </PageContainer>
  );
};
