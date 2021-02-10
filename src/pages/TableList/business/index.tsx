import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
// import { PlusOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import { queryList } from './service';
import Detail from '@/components/Detail';
import BusDetail from '@/components/BusDetail';
import Broadcast from '@/components/Broadcast';

const queryRule = async (fieds: any) => {
  const res = await queryList({ ...fieds });
  return {
    success: true,
    total: res.total,
    data: res.data,
  };
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, handleModalVisible] = useState<boolean>(false);
  const [broadVisible, handleModalBroadVisible] = useState<boolean>(false);
  const [businessVisible, handleModalBusinessVisible] = useState<boolean>(false);
  const [ids, handleIds] = useState<any[]>([]);

  const confirm = (text: string) => {
    message.success(text);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    message.success('留言成功!');
    handleModalBroadVisible(false);
  }

  const columns = [
    {
      title: '业务类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '业务标题',
      dataIndex: 'age',
      key: 'age',
      hideInSearch: true,
    },
    {
      title: '发布时间',
      dataIndex: 'time',
      key: 'time',
      valueType: 'date',
    },
    {
      title: '发布人',
      dataIndex: 'desc',
      key: 'desc',
      hideInSearch: true,
    },
    {
      title: '发布价格',
      dataIndex: 'phone',
      key: 'phone',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        loading: {
          text: '已下架',
          status: 'error',
        },
        running: {
          text: '正常',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, item: any) => [
        <a
          onClick={() => {
            handleModalBusinessVisible(true);
          }}
        >
          详情
        </a>,
        <a
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          人物详情
        </a>,
        <a onClick={() => {
          handleModalBroadVisible(true)
          handleIds([item.key])
        }}>广播</a>,
        <Popconfirm
          placement="bottomRight"
          title={item.status === 'loading' ? '是否确定上架?' : '是否确定下架?'}
          onConfirm={() => {
            confirm(item.status === 'loading' ? '上架成功!' : '下架成功!');
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>{item.status === 'loading' ? '上架' : '下架'}</a>
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
      ></ProTable>
      {broadVisible ? <Broadcast
        onCancel={() => {
          handleModalBroadVisible(false);
        }}
        onSubmit={(values: any) => {
          handleSubmit(values)
        }}
        id={ids}
        modalVisible={broadVisible}
      /> : null}
      {visible ? <Detail
        onCancel={() => {
          handleModalVisible(false);
        }}
        modalVisible={visible}
      /> : null}
      {businessVisible ? <BusDetail
        onCancel={() => {
          handleModalBusinessVisible(false);
        }}
        modalVisible={businessVisible}
      /> : null}
    </PageContainer>
  );
};

export default TableList;
