import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Row, Col, Typography } from 'antd';
import styles from './Welcome.less';
import { getArticleList } from '@/services/ant-design-pro/api';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const [articles, setArticles] = useState<any>([]);
  const getArticleLists = async (params: any) => {
    const msg = await getArticleList(params);
    if (msg.status === 200) {
      setArticles(msg?.data?.list);
    }
  };
  useEffect(() => {
    getArticleLists({ pageSize: 10, pageNum: 1 });
  }, []);
  return (
    <PageContainer>
      <Typography.Title level={2}>🔥热门文章</Typography.Title>
      <div style={{ marginBottom: 20 }} hidden={!articles?.length}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title={articles[0]?.title} bordered={false}>
              {articles[0]?.content}
            </Card>
          </Col>
          <Col span={8}>
            <Card title={articles[1]?.title} bordered={false}>
              {articles[1]?.content}
            </Card>
          </Col>
          <Col span={8}>
            <Card title={articles[2]?.title} bordered={false}>
              {articles[2]?.content}
            </Card>
          </Col>
        </Row>
      </div>
      <Card>
        <Alert
          message={
            '诊所使用的牙医排班和牙科服务预订系统。软件改善了预约体验，自动发送短信和电子邮件提醒，帮助管理患者数据库并在线推广牙科诊所服务。'
          }
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          现代牙科诊所排班软件,我们的应用程序正在改变人们向牙科医生预订服务的方式。现在只需几秒钟。此外，该系统可帮助您获得更多预订并保留更大比例的客户。
        </Typography.Text>
        <CodePreview>Do Design</CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          轻松预约牙医服务，实证研究表明，超过 96%
          的牙科护理患者使用在线预订系统安排预约，而不是打电话到诊所。该统计数据表明，人们更喜欢使用日程安排应用程序，因为它的预订过程简单且速度快。
        </Typography.Text>
        <CodePreview>Do Design</CodePreview>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
