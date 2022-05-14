import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
// import ProTable from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useRef, useState } from 'react';
import { getAllTempRecordList } from './services';

export default () => {
  const tableRef = useRef<any>(null);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const columns: ProColumns<any>[] = [
    {
      title: '订单编号',
      key: 'id',
      fixed: 'left',
      dataIndex: 'id',
      readonly: true,
    },
    {
      readonly: true,
      title: '时间',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: '游戏名',
      key: 'name',
      readonly: true,
      dataIndex: 'name',
    },
    {
      title: '租赁时常',
      readonly: true,
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: '价格',
      readonly: true,
      key: 'mon',
      dataIndex: 'mon',
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      render: (text, record, index, action) => [
        <a
          key="editable"
          onClick={() => {
            // console.log(record.id - 1);
            // console.log(editableKeys);
            action?.startEditable?.(record.id - 1);
          }}
        >
          操作
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        scroll={{ x: 1200 }}
        search={false}
        actionRef={tableRef}
        columns={columns}
        editable={{
          editableKeys,
          onChange: setEditableRowKeys,
          onCancel: async () => {
            await setEditableRowKeys([]);
          },
          actionRender: (row, config, dom) => [dom.cancel, dom.delete],
        }}
        pagination={{
          size: 'default',
        }}
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
