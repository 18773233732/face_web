import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  return (
    <PageContainer>
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
