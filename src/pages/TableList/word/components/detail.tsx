import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker
  // Button 
} from 'antd';
import moment from 'moment';

export type formprops = {
  name: string,
  desc: string,
  time: string | number,
  [propName: string]: any
}

export type UpdateFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: any) => void;
  values: formprops,
  modalVisible: boolean;
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const { TextArea } = Input

const Detail: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { values } = props
  const time = moment(values.time).format('YYYY-MM-DD')
  console.log(`ids:`, values)

  const handleSubmit = async() => {
    await form.validateFields()
    const res = await form.getFieldsValue()
    res.time = moment(res.time).format('YYYY-MM-DD')
    props.onSubmit(res)
  }


  const content = (
    <Form
      {...layout}
      form={form}
      // onFinish={handleSubmit}
      name="basic"
    >
      <Form.Item
        label="有效日期"
        name="time"
        initialValue={moment(time, 'YYYY-MM-DD')}
        rules={[{ required: true, message: '请选择有效日期' }]}
      >
         <DatePicker />
      </Form.Item>
      <Form.Item
        label="文字内容"
        initialValue={values.desc}
        name="word"
        rules={[{ required: true, message: '请输入文字内容' }]}
      >
        <TextArea allowClear autoSize={{minRows: 2, maxRows: 6}} showCount maxLength={500} />
      </Form.Item>

    </Form>
  );

  return (
    <Modal
      width={840}
      bodyStyle={{ padding: '30px' }}
      destroyOnClose
      title="编辑"
      maskClosable={false}
      visible={props.modalVisible}
      // footer={null}
      onCancel={() => {
        props.onCancel();
      }}
      onOk={handleSubmit}
    >
      {content}
    </Modal>
  );
};

export default Detail;
