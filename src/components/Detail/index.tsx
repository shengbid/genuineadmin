import React, { useEffect, useState } from 'react';
import { Modal, Avatar, Row, Col, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getUserInfo } from '@/services/user'

export type UpdateFormProps = {
  onCancel: (flag?: boolean) => void;
  id: string | number;
  // onSubmit: (values: FormValueType) => Promise<void>;
  modalVisible: boolean;
};


const Detail: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, id } = props
  const [userInfo, setUserInfo] = useState({
    age: '',
    sex: null,
    major: '',
    experience: '',
    idNumber: '',
    name: '',
    logo: '',
    phone: null,
    cellPhone: null,
    wechart: null,
    qq: null,
    email: '',
    website: '',
    isStatus: false,
    isPhoto: false,
    isRelaction: false,
    isResume: false,
    detail: '',
    avatar: '',
    wechatScan: '',
    qqScan: '',
    realName: '',
    advUrl: '',
    ad: null
  })

  const getInfoList = async() => {
    const res = await getUserInfo(id)
    if (res && res.data) {
      setUserInfo(res.data)
    }
  }

  useEffect(() => {
    if (modalVisible) {
      getInfoList()
    }
  }, [modalVisible])
  
  return (
    <Modal
      width={840}
      bodyStyle={{ padding: '30px' }}
      destroyOnClose
      maskClosable={false}
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
          <span className={styles.name}>{userInfo.name}</span>
        </div>
        <Row gutter={16} className={styles.cardcontanier}>
          <Col span={7}>
            <ul className={styles.cardlist}>
              <li className={styles.carditem}>
                <span className={styles.title}>联系电话:</span>
                <span className={styles.text}>{userInfo.cellPhone}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>联系手机:</span>
                <span className={styles.text}>{userInfo.phone}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>微信:</span>
                <span className={styles.text}>{userInfo.wechart}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>qq:</span>
                <span className={styles.text}>{userInfo.qq}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>邮箱:</span>
                <span className={styles.text}>{userInfo.email}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>其他号:</span>
                <span className={styles.text}>{userInfo.other}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>身份证号:</span>
                <span className={styles.text}>{userInfo.idNumber}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>实名:</span>
                <span className={styles.text}>{userInfo.realName}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>广告网址:</span>
                <span className={styles.text}>{userInfo.website}</span>
              </li>
            </ul>
          </Col>
          <Col span={7}>
            <ul className={styles.cardlist}>
              <li className={styles.carditem}>
                <span className={styles.title}>年龄:</span>
                <span className={styles.text}>{userInfo.age}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>性别:</span>
                <span className={styles.text}>{userInfo.sex === '0' ? '男' : '女'}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>专业:</span>
                <span className={styles.text}>{userInfo.major}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>技能经验:</span>
                <span className={styles.text}>{userInfo.experience}</span>
              </li>
              <li className={styles.carditem}>
                <span className={styles.title}>介绍:</span>
                <div className={styles.text}>
                {userInfo.detail}
                </div>
              </li>
            </ul>
          </Col>
          <Col span={5}>
            <div>
              <p>微信二维码</p>
              <Image
                width={130}
                src={userInfo.wechatScan}
              />
            </div>
            <div>
              <p>广告图片</p>
              <Image
                width={130}
                src={userInfo.advUrl}
              />
            </div>
          </Col>
          <Col span={5}>
            <div>
              <p>qq二维码</p>
              <Image
                width={130}
                src={userInfo.qqScan}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Detail;
