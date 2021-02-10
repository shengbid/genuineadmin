import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Upload
  // Button 
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
// import type { UploadProps } from 'antd/es/upload';

export type formprops = {
  name: string,
  wechart: string,
  desc: string,
  time: string | number
}
interface UploadProps {
  uid: string,
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

const files: UploadProps[] = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }
]

const Detail: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [previewVisible, handlePreviewVisible] = useState(false)
  const [previewImage, handlePreviewImage] = useState('')
  const [fileList, handleFileList] = useState(files)

  const { values } = props
  const time = moment(values.time).format('YYYY-MM-DD')
  // console.log(`ids:`, values, files)

  const handleSubmit = async() => {
    await form.validateFields()
    const res = await form.getFieldsValue()
    res.time = moment(res.time).format('YYYY-MM-DD')
    props.onSubmit(res)
  }

  const handlePreview = (file: any) => {
    console.log(55, file)
    handlePreviewVisible(true)
    handlePreviewImage(file.url)
  }
  const handleRemove = (file: any) => {
    // console.log(77, file)
    const arr: fileProps[] = fileList.filter((item: any) => {
      return item.uid !== file.uid
    })
    handleFileList(arr)
  }
  const handleChange = (file: any) => {
    // handleFileList(file)
    const arr = [...fileList]
    const data = file ? file.file : {}
    if (data && data.response) {
      arr.push(data.response.file)
      handleFileList(arr)
    }
    // console.log(99, file, fileList, arr)
  }
  const normFile = (e: any) => {
    console.log('Upload event:', e, fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
    // return fileList;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const upload = (
    <Upload
      action="http://localhost:8000/api/upload"
      listType="picture-card"
      accept="image/png, image/jpeg"
      fileList={fileList}
      onPreview={handlePreview}
      onChange={handleChange}
      onRemove={handleRemove}
    >
      {fileList.length >= 5 ? null : uploadButton}
    </Upload>
  )

  const content = (
    <Form
      {...layout}
      form={form}
      // onFinish={handleSubmit}
      name="basic"
    >
      <Form.Item
        label="广告位置"
      >
        <span>{values.name}</span>
      </Form.Item>
      <Form.Item
        label="图片尺寸"
      >
        <span>{values.name}</span>
      </Form.Item>
      <Form.Item
        label="图片跳转链接"
        initialValue={values.desc}
        name="link"
        rules={[{ required: true, message: '请输入图片跳转链接' }]}
      >
        <Input allowClear maxLength={50} />
      </Form.Item>
      <Form.Item
        label="广告有效时间"
        name="time"
        initialValue={moment(time, 'YYYY-MM-DD')}
        rules={[{ required: true, message: '请选择广告有效时间' }]}
      >
         <DatePicker />
      </Form.Item>
      <Form.Item
        label="广告图片"
        name="img"
        valuePropName="fileList"
        initialValue={fileList}
        getValueFromEvent={normFile}
        rules={[{ required: true, message: '请上传广告图片' }]}
      >
         {upload}
      </Form.Item>
      <Modal
        visible={previewVisible}
        footer={null}
        title=''
        onCancel={() => {
          handlePreviewVisible(false)
        }}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Form>
  );

  return (
    <Modal
      width={840}
      bodyStyle={{ padding: '32px 40px 30px' }}
      destroyOnClose
      maskClosable={false}
      title="编辑"
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
