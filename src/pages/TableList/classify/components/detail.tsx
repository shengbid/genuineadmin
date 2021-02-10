import React from 'react';
import { Modal, Image } from 'antd';

export type UpdateFormProps = {
  onCancel: (flag?: boolean) => void;
  // onSubmit: (values: FormValueType) => Promise<void>;
  modalVisible: boolean;
};

const Detail: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '30px', textAlign: 'center' }}
      destroyOnClose
      maskClosable={false}
      title="结构图"
      visible={props.modalVisible}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <Image
        width={400}
        height={500}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </Modal>
  )
}

export default Detail