import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAllTempRecordList } from './services';

export default () => {
  const columns: ProColumns<any>[] = [
    {
      title: '打卡记录编号',
      key: 'id',
      fixed: 'left',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '温度',
      key: 'temp',
      dataIndex: 'temp',
      render: (_, record: any) => {
        return <>{`${record.temp}°C`}</>;
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '更新时间',
      key: 'date',
      dataIndex: 'date',
      valueType: 'dateTime',
    },
  ];
  return (
    <PageContainer>
      <ProTable
        search={false}
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
          const result = await getAllTempRecordList({
            current: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: result.data.list.map((item: any) => {
              return {
                ...item,
                key: `key-of-user-${item.id}`,
              };
            }),
            // success 请返回 true，
            success: result.data.success,
            // 不然 table 会停止解析数据，即使有数据
            // success: boolean,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: result.data.total,
          };
        }}
      />
    </PageContainer>
  );
};
