import React, { useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Alert } from 'antd';
import { getDeviceInfo } from '../services';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import ValueChar from './ValueChar';
import type { DeviceInfo } from '../entries';

const { Text } = Typography;

const DeviceBoard: React.FC = () => {
  const [value, setValue] = useState<DeviceInfo | undefined>();
  const getValue = async () => {
    const data = await getDeviceInfo();
    if (data.success && data.code === 200) {
      const deviceInfo = data.data.deviceInfo;
      setValue(deviceInfo);
    } else {
      setValue(undefined);
    }
  };

  useEffect(() => {
    getValue();
    const timer = setInterval(async function () {
      await getValue();
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const cpuValue = useMemo(() => value?.cpu || 0, [value]);
  const memValue = useMemo(() => value?.mem || 0, [value]);
  const diskValue = useMemo(() => value?.disk || 0, [value]);
  const ipValue = useMemo(() => value?.ip || '', [value]);
  const nameValue = useMemo(() => value?.name || '', [value]);
  const dateValue = useMemo(() => value?.date || '', [value]);

  return (
    <PageContainer>
      <Alert
        message="为了服务器负载均衡，该信息动态更新间隔为10s。"
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
      />
      <Row gutter={16}>
        <Col span={8}>
          <Card title="IP地址" bordered={false}>
            <Text strong>{ipValue}</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="设备名称" bordered={false}>
            <Text strong> {nameValue}</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="更新时间" bordered={false}>
            <Text strong>{dateValue}</Text>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card title="CPU温度" bordered={false}>
            <ValueChar valueType="cpuTemp" color="#FFAB91" value={cpuValue} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="内存占用" bordered={false}>
            {/* <GaugeChart option={option} /> */}
            <ValueChar valueType="memUsage" color="#a4e2c6" value={memValue} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="硬盘占用" bordered={false}>
            {/* <GaugeChart option={option} /> */}
            <ValueChar
              valueType="diskUsage"
              color="#d3b17d"
              value={diskValue}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default DeviceBoard;
