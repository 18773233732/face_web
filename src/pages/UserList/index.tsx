import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { selectUserList } from '@/services/ant-design-pro/api';
import { useRef } from 'react';
import { Button, message } from 'antd';
import { isEmpty } from 'lodash';
import { userDelete } from '@/services/ant-design-pro/api';

enum userType {
  '管理员',
  '用户',
  '医生',
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
      title: '用户名称',
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: '用户ID',
      key: 'userId',
      dataIndex: 'userId',
    },
    {
      title: '用户类型',
      key: 'type',
      dataIndex: 'type',
      valueEnum: userType,
    },
    {
      title: '生日',
      key: 'birthday',
      dataIndex: 'birthday',
    },
    {
      title: '地址',
      key: 'address',
      dataIndex: 'address',
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
            onClick={() => handleDelete(value.userId)}
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
  }): Promise<any> => {
    const msg = await selectUserList(data);
    // console.log(msg);
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
  // useEffect(() => {
  //   getUserSelectList({ pageNum: 1, pageSize: 1000 });
  // }, []);
  return (
    <PageContainer>
      <ProTable
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
          });
          // console.log(msg, 1111)
          return {
            data: msg,
            // success 请返回 true，
            success: !isEmpty(msg),
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
