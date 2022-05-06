import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Statistic } from 'antd';
import './index.less';
import PieChart from './CircleChart';
import { getErrorData, getUsersLength } from '../services';
import { ArrowUpOutlined } from '@ant-design/icons';
import ClockChart from './ClockChart';
import { Link } from 'umi';

const SchoolBoard: React.FC = () => {
  const [errorData, setErrorData] = useState<any>({
    yesterdayError: 0,
    todayError: 0,
    todayRecords: 0,
  });
  const [userLength, setUserLength] = useState<number>(0);
  const getUsersLengthValue = async () => {
    const msg = await getUsersLength();
    if (msg.success === true && msg.code === 200) {
      setUserLength(msg.data.length);
    } else {
      setUserLength(0);
    }
  };
  const getErrorDataValue = async () => {
    const msg = await getErrorData();
    if (msg.success === true && msg.code === 200) {
      setErrorData(msg.data);
    } else {
      setErrorData({ yesterdayError: 0, todayError: 0 });
    }
  };
  useEffect(() => {
    getUsersLengthValue();
  }, []);
  useEffect(() => {
    getErrorDataValue();
  }, []);
  return (
    <PageContainer>
      <div
        style={{
          marginBottom: 20,
          padding: '20px 20px',
          background: 'white',
        }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="账户数量" value={userLength} />
          </Col>
          <Col span={6}>
            <Link to={'/situation/yesterdayrecords'}>
              <Statistic
                title="昨日温度异常人数"
                value={errorData.yesterdayError}
              />
            </Link>
          </Col>
          <Col span={6}>
            <Link to={'/situation/todayrecords'}>
              <Statistic
                title="今日温度异常人数"
                value={errorData.todayError}
              />
            </Link>
          </Col>
          <Col span={6}>
            <Statistic
              title="新增情况"
              value={errorData.todayError}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowUpOutlined />}
              suffix="人"
            />
          </Col>
        </Row>
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="实时温度监测分析" bordered={false}>
            {/* <GaugeChart option={option} /> */}
            <PieChart
              data={[
                {
                  name: '今日温度异常人数',
                  value: errorData.todayError,
                },
                {
                  name: '今日温度正常人数',
                  value: userLength - errorData.todayError,
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="健康打卡完成指数" bordered={false}>
            <ClockChart value={(errorData.todayRecords * 100).toFixed(2)} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default SchoolBoard;
