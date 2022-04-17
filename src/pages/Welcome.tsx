import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Row, Col, Typography } from 'antd';
// import styles from './Welcome.less';
import { getArticleList } from '@/services/ant-design-pro/api';

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
          message={'我刷牙、用牙线，但还是有好多龋洞，怎么预防?'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          答：
          如果你按时刷牙，用漱口水和牙线还是会容易长龋齿，那你应该请牙医检查一下自己的清洁技术和饮食习惯。可能是你唾液中的酸性物质成分过高。你要知道，食物和饮料(例如运动饮料和可乐)含有很多酸性物质和糖类，它们会造成龋齿。刷牙的方式方法也很重要，推荐改良的巴氏刷牙法，它可能是最能有效清洁牙菌斑的刷牙方法了。
        </Typography.Text>
      </Card>
      <div style={{ height: 10 }} />
      <Card>
        <Alert
          message={'哪种牙线比较好?我偏爱某种牙线有影响吗?'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          答：牙线一般分为有蜡和无蜡两种。据调查：大概有79%的消费者喜欢有蜡的牙线，而只有21%的消费者喜欢无蜡牙线。无蜡的牙线很光滑，一般比有蜡的牙线细，主要用于非常紧密的牙齿接触点;有蜡的作用是使牙线的纤维结合在一起，能够很容易地通过牙齿接触点。有些牙医认为无蜡牙线可能会去除更多菌斑，其实，无论哪种牙线，只要使用方便，功效显著就是好的。
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
