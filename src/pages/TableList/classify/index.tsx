
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { queryList } from './service';
import { Button, message, Popconfirm } from 'antd'
import Detail from './components/detail';

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

  const confirm = (text: string) => {
    message.success(text);
  };

  const columns = [
    {
      title: '大类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '小类型',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '修改时间',
      dataIndex: 'time',
      key: 'time',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => [
        <Popconfirm
          placement="bottomRight"
          title={'是否确定删除?'}
          onConfirm={() => {
            confirm('删除成功!');
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
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            查看结构图
          </Button>,
        ]}
        request={(params) => queryRule({ ...params })}
        columns={columns}
      />
      {visible ? <Detail
        onCancel={() => {
          handleModalVisible(false);
        }}
        modalVisible={visible}
      /> : null}
    </PageContainer>
  );
};

export default TableList;
