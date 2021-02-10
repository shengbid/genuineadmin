import React from 'react';
import { Modal, Avatar, Row, Col, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.less';

// console.log(5, styles)

export type UpdateFormProps = {
  onCancel: (flag?: boolean) => void;
  // onSubmit: (values: FormValueType) => Promise<void>;
  modalVisible: boolean;
};

const Detail: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      width={840}
      bodyStyle={{ padding: '30px 40px' }}
      destroyOnClose
      maskClosable={false}
      title="详情"
      visible={props.modalVisible}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <div className="businessdetailcontainer">
        <div className="acter">
          <Avatar size="large" shape="square" icon={<UserOutlined />} />
          <span className="name">华为技术服务有限公司</span>
        </div>
        <Row gutter={16} className="cardcontanier">
          <Col span={10}>
            <ul className="cardlist">
              <li className="carditem">
                <span className="maintitle">公司logo设计</span>
              </li>
              <li className="carditem">
                <span className="title">报价:</span>
                <span className="maintitle">156696333</span>
              </li>
              <li className="carditem">
                <span className="title">业务备注:</span>
                <div className="text">
                  贫而无谄(1)，富而无骄，何如(2)？”子曰：“可也。未若贫而乐(3)，富而好礼者也。”子贡曰：《诗》云，‘如切如磋！如琢如磨(4)’，其斯之谓与？”
                  子曰：“赐(5)也！始可与言《诗》已矣，告诸往而知来者(6)。
                </div>
              </li>
            </ul>
          </Col>
          <Col span={7}>
            <div>
              <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
            <div>
              <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
          </Col>
          <Col span={7}>
            <div>
              <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
            <div>
              <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Detail;
