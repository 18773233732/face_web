import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
// import ProTable from '@ant-design/pro-table';
import { omit } from 'lodash';
import { EditableProTable } from '@ant-design/pro-table';
import { useRef, useState } from 'react';
import { getUserList, updateUserInfo } from './services';
import { message } from 'antd';

export default () => {
  const columns: ProColumns<any>[] = [
    {
      title: '用户编号',
      width: 150,
      key: 'id',
      fixed: 'left',
      dataIndex: 'id',
      readonly: true,
    },
    {
      title: '用户名',
      width: 150,
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '手机',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      readonly: true,
      key: 'state',
      dataIndex: 'state',
      valueEnum: {
        1: { text: '在线', status: 'Success' },
        0: { text: '离线', status: 'Default' },
      },
    },
    {
      title: '身份',
      key: 'role',
      dataIndex: 'role',
      readonly: true,
      valueEnum: {
        0: { text: '学生' },
        1: { text: '老师' },
        2: { text: '管理员' },
      },
    },
    {
      title: '所属学院',
      width: 150,
      key: 'college',
      dataIndex: 'college',
    },
    {
      title: '注册时间',
      readonly: true,
      key: 'date',
      dataIndex: 'date',
      valueType: 'dateTime',
    },
    {
      title: '省份',
      key: 'provinces',
      dataIndex: 'provinces',
    },
    {
      title: '市区',
      key: 'city',
      dataIndex: 'city',
    },
    {
      title: '地区',
      key: 'area',
      dataIndex: 'area',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (text, record, index, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id - 1);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  const tableRef = useRef<any>(null);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  return (
    <PageContainer>
      <EditableProTable
        scroll={{ x: 1800 }}
        search={false}
        actionRef={tableRef}
        columns={columns}
        recordCreatorProps={false}
        editable={{
          editableKeys,
          onChange: setEditableRowKeys,
          onSave: async (recordKey: any, record: any) => {
            const userData = omit(record, [
              'key',
              'id',
              'state',
              'date',
              'index',
            ]);
            const data = await updateUserInfo({ ...userData, id: record.id });
            if (data.code === 200 && data.success === true) {
              message.success('更新用户信息成功！');
              tableRef?.current?.reload();
              await setEditableRowKeys([]);
            } else {
              message.error('更新用户信息失败！');
            }
          },
          onCancel: async () => {
            await setEditableRowKeys([]);
          },
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
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
          const result = await getUserList({
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
