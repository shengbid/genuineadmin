import React from 'react';
import { Modal, Form, Input, 
  // Button 
} from 'antd';

export type UpdateFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: any) => void;
  id: string[],
  modalVisible: boolean;
};

const layout = {
  wrapperCol: { span: 20 },
};

const { TextArea } = Input;

const Detail: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const ids = props.id
  console.log(`ids:`, ids, props.modalVisible)
  const handleSubmit = async() => {
    await form.validateFields()
    const values = await form.getFieldsValue()
    props.onSubmit(values)
  }

  const content = (
    <Form
      {...layout}
      form={form}
      // onFinish={handleSubmit}
      name="basic"
    >
      <Form.Item
        name="text"
        rules={[{ required: true, message: '请输入留言内容' }]}
      >
        <TextArea placeholder="请输入留言内容" allowClear autoSize={{minRows: 2, maxRows: 6}} showCount maxLength={500} />
      </Form.Item>
      {/* <Form.Item>
        <Button type="primary" onClick={() => {
          props.onCancel();
        }}>
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item> */}
    </Form>
  );

  return (
    <Modal
      width={840}
      bodyStyle={{ padding: '32px 40px 30px' }}
      destroyOnClose
      title="留言"
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
