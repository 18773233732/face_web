import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import './index.less';
import CpuTemp from './CpuTemp';

const SystemBoard: React.FC = () => {
  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="CPU温度" bordered={false}>
            <CpuTemp valueType="cpuTemp" color="#FFAB91" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="内存占用" bordered={false}>
            {/* <GaugeChart option={option} /> */}
            <CpuTemp valueType="memUsage" color="#a4e2c6" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="硬盘占用" bordered={false}>
            {/* <GaugeChart option={option} /> */}
            <CpuTemp valueType="diskUsage" color="#d3b17d" />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default SystemBoard;
