import pic from './pic.jpeg';
import { Checkbox, Form, Input, Modal } from 'antd';
import './index.less';
import { Cascader, Button, Result } from 'antd';
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';
import { compact } from 'lodash';
import { useState } from 'react';
import logo from './logo.png';
import { history, request } from 'umi';

export function updateUserInfo(params: any) {
  return request<any>('/api/user/infoAdd', {
    method: 'POST',
    data: params,
  });
}

export default function IndexPage() {
  const [show, setShow] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>({});
  const onFinish = (values: any) => {
    const formvalues = values;
    formvalues.location = formvalues.location.toString();
    setFormValues(formvalues);
    setShow(2);
  };
  const options = provinces.map((province: { name: string; code: string }) => {
    return {
      label: province.name,
      value: province.name,
      children: compact(
        cities.map(
          (city: { name: string; code: string; provinceCode: string }) => {
            if (city.provinceCode === province.code) {
              return {
                label: city.name,
                value: city.name,
                children: compact(
                  areas.map(
                    (area: {
                      name: string;
                      code: string;
                      cityCode: string;
                      provinceCode: string;
                    }) => {
                      if (area.cityCode === city.code) {
                        return {
                          label: area.name,
                          value: area.name,
                        };
                      } else {
                        return undefined;
                      }
                    },
                  ),
                ),
              };
            } else {
              return undefined;
            }
          },
        ),
      ),
    };
  });
  return (
    <>
      <div hidden={show !== 1}>
        <div className="pageContainer">
          <img src={pic} className="headImage" />
          <Form
            onFinish={onFinish}
            className="pageForm"
            labelCol={{ span: 4 }}
            size="large"
            labelAlign="left"
            autoComplete="off"
          >
            <div className="pageFormItem">
              <Form.Item label="姓名" name="name">
                <Input
                  allowClear
                  required
                  bordered={false}
                  placeholder="请输入收货人姓名"
                />
              </Form.Item>
            </div>
            <div className="pageFormItem">
              <Form.Item label="联系方式" name="phone">
                <Input
                  allowClear
                  required
                  bordered={false}
                  placeholder="请输入11位手机号"
                />
              </Form.Item>
            </div>
            <div className="pageFormItem">
              <Form.Item label="所在地区" name="location">
                <Cascader
                  placement="topRight"
                  style={{ textAlign: 'right' }}
                  options={options}
                  placeholder="请选择省市区"
                  bordered={false}
                  suffixIcon={false}
                />
              </Form.Item>
            </div>
            <Form.Item label="详细地址" name="region">
              <Input placeholder="地址" required bordered={false} />
            </Form.Item>
            <Form.Item style={{ marginTop: 40, paddingBottom: 20 }}>
              <Button block danger type="primary" htmlType="submit">
                提交申请
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        hidden={show !== 2}
        style={{ backgroundColor: 'rgba(135,153,163, .1)', height: '100vh' }}
      >
        <div
          className="locationDiv"
          style={{
            // backgroundColor: 'grey',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: 4,
          }}
        >
          <div
            style={{
              width: '300px',
              padding: 5,
              backgroundColor: 'white',
              color: 'grey',
              fontSize: 15,
            }}
          >
            收货地址：
            <div>{formValues.phone}</div>
            <div>{formValues.location}</div>
            <div>{formValues.address}</div>
          </div>
        </div>
        <div
          style={{
            padding: '10px 0 0 10px',
            color: 'grey',
            fontSize: 18,
            backgroundColor: 'white',
          }}
        >
          支付方式
          <div
            style={{
              border: '1px solid #33CC33',
              marginTop: 10,
              borderRadius: 5,
              padding: '10px 20px',
              color: 'grey',
            }}
          >
            <img src={logo} style={{ width: 40 }} />
            <span style={{ padding: 5, color: '#66CC33' }}>免押金领取</span>
            550分以上可免费领取
          </div>
        </div>
        <div
          style={{
            color: 'grey',
            backgroundColor: 'white',
            marginTop: 10,
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>商品总价</div>
          <div style={{ textDecoration: 'line-through' }}>199</div>
          <div>已免除</div>
        </div>
        <div
          style={{
            padding: 10,
            backgroundColor: 'white',
            marginTop: 10,
            color: 'grey',
          }}
        >
          <Checkbox defaultChecked style={{ margin: '0 10px' }} />
          是否同意
          <span
            style={{ color: '#66CC33' }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            《委托扣款协议书》
          </span>
        </div>
        <div
          style={{
            padding: 10,
            backgroundColor: 'white',
            marginTop: 10,
            color: 'grey',
          }}
        >
          温馨提示：微信支付分达到550分及以上，免押金领取机器；领取期间不收取押金，您需在收货后30天内激活设备，不激活将通过微信支付分扣取机器押金199元!
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            textAlign: 'center',
            padding: 5,
            backgroundColor: 'white',
            width: '100vw',
          }}
        >
          <Button
            style={{
              height: 60,
              backgroundColor: 'rgb(12,193,96)',
              borderRadius: 20,
            }}
            onClick={() => {
              setShow(3);
              // 接口
              updateUserInfo(formValues);
            }}
          >
            <div style={{ color: 'white', fontSize: 18 }}>免押金领取</div>
            <div style={{ color: 'white', fontSize: 12, padding: '0 70px' }}>
              微信支付分550分以上可免费领取
            </div>
          </Button>
        </div>
      </div>
      <Modal
        title="委托扣款授权书"
        visible={showModal}
        maskClosable={false}
        cancelText="关闭"
        onCancel={() => {
          setShowModal(false);
        }}
        onOk={() => {
          setShowModal(false);
        }}
      >
        本授权书由您向广州天天刷信息科技有限公司（下称“广州天天刷”）出具，具有授权之法律效力。请您务必审慎阅读、充分理解本授权书各条款内容，特别是免除或者限制责任的条款，前述条款可能以加粗字体显示，您应重点阅读。除非您已阅读并接受本授权书所有条款，否则您无权使用微信支付的自动续费、自动缴费、自动扣款等服务。您同意本授权书即视为您已授权广州天天刷代理您向财付通支付科技有限公司（下称“财付通”）申请开通微信支付自动续费和免密支付功能，并自愿承担由此导致的一切法律后果。
        您确认并不可撤销地授权广州天天刷向财付通发出扣款指令，财付通即可在不验证您的支付密码、短信动态码等信息的情况下直接从您的银行账户或微信支付账户中扣划广州天天刷指定的款项至广州天天刷指定账户。
        在任何情况下，只要广州天天刷向财付通发出支付指令，财付通就可按照该指令进行资金扣划，财付通对广州天天刷的支付指令的正确性、合法性、完整性、真实性不承担任何法律责任，相关法律责任由您和广州天天刷自行承担。
        您在扣款账户内必须预留有足够的资金余额，否则因账户余额不足导致无法及时扣款或扣款错误、失败的，一切责任由您自行承担。因不可归责于财付通的事由，导致的不能及时划付款项、划账错误等责任与财付通无关。
        您确认，因上广州天天刷的原因导致您遭受经济损失的，由您与广州天天刷协商解决，与财付通无关。
      </Modal>
      <div hidden={show !== 3}>
        <Result
          status="success"
          title="下单成功"
          subTitle="订单已下单成功成功，等待后台进行发货"
          extra={[
            <Button
              key="buy"
              onClick={() => {
                history.push('/');
              }}
            >
              关闭
            </Button>,
          ]}
        />
      </div>
    </>
  );
}
