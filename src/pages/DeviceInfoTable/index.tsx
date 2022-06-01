import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getDeviceInfoList } from './services';
import { useState } from 'react';

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const columns: ProColumns<any>[] = [
    {
      title: '记录编号',
      key: 'id',
      readonly: true,
      fixed: 'left',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      key: 'name',
      readonly: true,
      dataIndex: 'name',
    },
    {
      title: '电话',
      key: 'phone',
      readonly: true,
      dataIndex: 'phone',
    },
    {
      title: '地区',
      key: 'region',
      readonly: true,
      dataIndex: 'region',
    },
    {
      title: '详细地址',
      key: 'location',
      readonly: true,
      dataIndex: 'location',
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   fixed: 'right',
    //   render: (text, record, index, action) => [
    //     <a
    //       key="editable"
    //       onClick={() => {
    //         action?.startEditable?.(record.id - 1);
    //       }}
    //     >
    //       操作
    //     </a>,
    //   ],
    // },
  ];
  return (
    <PageContainer>
      <ProTable
        search={false}
        columns={columns}
        editable={{
          editableKeys,
          onChange: setEditableRowKeys,
          onCancel: async () => {
            await setEditableRowKeys([]);
          },
          actionRender: (row, config, dom) => [dom.cancel, dom.delete],
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
          const result = await getDeviceInfoList({
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
