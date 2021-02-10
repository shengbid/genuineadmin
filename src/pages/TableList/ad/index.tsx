
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { Popconfirm, message } from 'antd';
import { queryList, uploadFile } from './service';
import Detail from './components/Detail';

const queryRule = async (fieds: any) => {
  const res = await queryList({ ...fieds })
  return {
    success: true,
    total: res.total,
    data: res.data
  }
}
const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [visible, handleModalVisible] = useState<boolean>(false)
  const [values, handleValues] = useState({});

  const confirm = (text: string) => {
    message.success(text);
  };

  const handleSubmit = (value: any) => {
    console.log(value);
    message.success('留言成功!');
    handleModalVisible(false);
  }

  const columns = [
    {
      title: '广告位置',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '图片尺寸',
      dataIndex: 'wechart',
      key: 'wechart',
      hideInSearch: true,
    },
    {
      title: '广告跳转链接',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
    {
      title: '广告预览',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '有效时间',
      dataIndex: 'time',
      key: 'time',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, item: any) => [
        <a
          key="subscribeAlert"
          onClick={() => {
            handleValues(item);
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          placement="bottomRight"
          title={'是否确定删除?'}
          onConfirm={async() => {
            confirm('删除成功!');
            const res = await uploadFile()
            console.log(res)
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={(params) => queryRule({ ...params })}
        columns={columns}
      />
      {visible ? <Detail
        onCancel={() => {
          handleModalVisible(false);
        }}
        onSubmit={(value: any) => {
          handleSubmit(value)
        }}
        values={values}
        modalVisible={visible}
      /> : null}
    </PageContainer>
  );
};

export default TableList;
