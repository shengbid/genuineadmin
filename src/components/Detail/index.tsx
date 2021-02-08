import React from 'react';
import { Modal, Avatar, Row, Col, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.less';

export type UpdateFormProps = {
  onCancel: (flag?: boolean) => void;
  // onSubmit: (values: FormValueType) => Promise<void>;
  modalVisible: boolean;
};

const Detail: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      width={840}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="详情"
      visible={props.modalVisible}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <div className={styles.detailcontainer}>
        <div className={styles.acter}>
          <Avatar size="large" icon={<UserOutlined />} />
          <span className={styles.name}>张三</span>
        </div>
        <Row gutter={16} className={styles.cardcontanier}>
          <Col span={7}>
            <ul className={styles.cardlist}>
              <li className={styles.carditem}>
                <span className={styles.title}>联系电话:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>联系手机:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>微信:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>qq:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>邮箱:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>其他号:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>身份证号:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>实名:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>广告网址:</span>
                <span className={styles.text}>156696333</span>
              </li>
            </ul>
          </Col>
          <Col span={7}>
            <ul className={styles.cardlist}>
              <li className={styles.carditem}>
                <span className={styles.title}>年龄:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>性别:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>专业:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>技能经验:</span>
                <span className={styles.text}>156696333</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>介绍:</span>
                <div className={styles.text}>
                  贫而无谄(1)，富而无骄，何如(2)？”子曰：“可也。未若贫而乐(3)，富而好礼者也。”子贡曰：《诗》云，‘如切如磋！如琢如磨(4)’，其斯之谓与？”
                  子曰：“赐(5)也！始可与言《诗》已矣，告诸往而知来者(6)。
                </div>
              </li>
            </ul>
          </Col>
          <Col span={5}>
            <div>
              <p>微信二维码</p>
              <Image
                width={130}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
            <div>
              <p>广告图片</p>
              <Image
                width={130}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
          </Col>
          <Col span={5}>
            <div>
              <p>qq二维码</p>
              <Image
                width={130}
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
