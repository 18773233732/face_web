import { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.RuleListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.RuleListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) =>
      data?.name?.includes(params.name || ''),
    );
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(
        (item) => key.indexOf(item.key) === -1,
      );
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.RuleListItem = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: moment().format('YYYY-MM-DD'),
          createdAt: moment().format('YYYY-MM-DD'),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

const orderSelectUserList = {
  status: 200,
  msg: 'SUCCESS',
  data: {
    total: 2,
    list: [
      {
        pageNum: null,
        pageSize: null,
        orderId: 1,
        orderUser: 1002,
        orderDoctor: null,
        orderDate: '2022-04-11',
        orderTime: 0,
        createTime: '2022-04-11 10:00:00',
        orderNumber: null,
        userName: '用户1',
        doctorName: null,
      },
      {
        pageNum: null,
        pageSize: null,
        orderId: 3,
        orderUser: 1003,
        orderDoctor: null,
        orderDate: '2022-04-11',
        orderTime: 0,
        createTime: '2022-04-11 10:00:00',
        orderNumber: null,
        userName: '用户2',
        doctorName: null,
      },
    ],
    pageNum: 1,
    pageSize: 10,
    size: 2,
    startRow: 1,
    endRow: 2,
    pages: 1,
    prePage: 0,
    nextPage: 0,
    isFirstPage: true,
    isLastPage: true,
    hasPreviousPage: false,
    hasNextPage: false,
    navigatePages: 8,
    navigatepageNums: [1],
    navigateFirstPage: 1,
    navigateLastPage: 1,
  },
};

const orderSelectDoctorOrder = {
  status: 200,
  msg: 'SUCCESS',
  data: {
    total: 2,
    list: [
      {
        pageNum: null,
        pageSize: null,
        orderId: 1,
        orderUser: null,
        orderDoctor: 1006,
        orderDate: '2022-04-11',
        orderTime: 0,
        createTime: '2022-04-11 10:00:00',
        orderNumber: null,
        userName: null,
        doctorName: '医生1',
      },
      {
        pageNum: null,
        pageSize: null,
        orderId: 2,
        orderUser: null,
        orderDoctor: 1007,
        orderDate: '2022-04-12',
        orderTime: 0,
        createTime: '2022-04-11 10:00:00',
        orderNumber: null,
        userName: null,
        doctorName: '医生2',
      },
    ],
    pageNum: 1,
    pageSize: 10,
    size: 2,
    startRow: 1,
    endRow: 2,
    pages: 1,
    prePage: 0,
    nextPage: 0,
    isFirstPage: true,
    isLastPage: true,
    hasPreviousPage: false,
    hasNextPage: false,
    navigatePages: 8,
    navigatepageNums: [1],
    navigateFirstPage: 1,
    navigateLastPage: 1,
  },
};

const articleSelectList = {
  status: 200,
  msg: 'SUCCESS',
  data: {
    total: 0,
    list: [],
    pageNum: 1,
    pageSize: 10,
    size: 0,
    startRow: 0,
    endRow: 0,
    pages: 0,
    prePage: 0,
    nextPage: 0,
    isFirstPage: true,
    isLastPage: true,
    hasPreviousPage: false,
    hasNextPage: false,
    navigatePages: 8,
    navigatepageNums: [],
    navigateFirstPage: 0,
    navigateLastPage: 0,
  },
};

export default {
  // 'GET /api/rule': getRule,
  // 'POST /api/rule': postRule,
  // 'POST /api/order/selectUserList': orderSelectUserList,
  // 'POST /api/order/selectDoctorOrder': orderSelectDoctorOrder,
  // 'POST /api/article/selectList': articleSelectList,
};
