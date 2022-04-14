import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import type { GaugeSeriesOption } from 'echarts/charts';
import GaugeChart from 'echarts-for-react';
import './index.less';

const SchoolBoard: React.FC = () => {
  type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;
  const [value, setValue] = useState<number>(20);
  useEffect(() => {
    setInterval(function () {
      const random = +(Math.random() * 60).toFixed(2);
      setValue(random);
    }, 2000);
  }, []);
  const option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          color: '#FFAB91',
        },
        progress: {
          show: true,
          width: 30,
        },

        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999',
          },
        },
        axisLabel: {
          distance: -20,
          color: '#999',
          fontSize: 20,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'auto',
        },
        data: [
          {
            value,
          },
        ],
      },
    ],
  };

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            <GaugeChart option={option} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            <GaugeChart option={option} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            <GaugeChart option={option} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default SchoolBoard;
