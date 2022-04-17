import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row } from 'antd';

export default () => {
  return (
    <PageContainer>
      <Card title="系统简介">
        该系统是一款专门针对小型口腔门诊设计的一款管理软件。该软件界面简洁，菜单功能一目了然，集基础信息设置、信息录入、数据查询和有助于各口腔门诊获取决策，提高工作效率，提升服务质量。
      </Card>
      <div style={{ marginTop: 20 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="信息管理模块" bordered={false}>
              <ul>
                <li>（1）医生和用户可进行登录、注册和修改密码等操作。</li>
                <li>（2）查看系统说明书。</li>
                <li>（3）查看、修改个人基本信息，包括电话、住址等。</li>
                <li>（4）患者可查看诊疗结果。</li>
              </ul>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="预约模块" bordered={false}>
              <ul>
                <li>（1）预约时，可查看相关口腔知识，普及空腔知识教育</li>
                <li>（2）可先向医生咨询，是否需要预约就诊，等待医生回复</li>
                <li>（3）患者查询医生信息，进行预约，取消，删除操作。</li>
              </ul>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="诊疗模块
"
              bordered={false}
            >
              <ul>
                <li>（1）患者可进行术后咨询、查看诊疗记录，时间日期，状态等</li>
                <li>
                  （2）医生进行回访，诊疗后一周收集患者情况，并上传相关信息
                </li>
                <li>（3）医生上传医学知识</li>
                <li>（4）医生向患者发布诊疗记录</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};
