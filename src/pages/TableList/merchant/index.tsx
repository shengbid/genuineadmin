
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import { queryList } from './service';
import Detail from '@/components/Detail';
import Broadcast from '@/components/Broadcast';
// import type {
//   BasicLayoutProps as ProLayoutProps,
// } from '@ant-design/pro-layout';

// export type routeProps = {
//   route: ProLayoutProps['route']
// } & ProLayoutProps

const queryRule = async (fieds: any) => {
  const res = await queryList({ ...fieds });
  return {
    success: true,
    total: res.total,
    data: res.data,
  };
};

const TableList: React.FC = () => {

  // const { location = {
  //   pathname: '/'
  // }} = props;

  // const paths = location.pathname.split('/')
  // const currentPath = paths[2] ? paths[2] : 'user'

  // if (currentPath === 'merchant') { // 商户管理
  //   console.log(location.pathname) 
  // }
  const actionRef = useRef<ActionType>();
  const [visible, handleModalVisible] = useState<boolean>(false)
  const [broadVisible, handleModalBroadVisible] = useState<boolean>(false);
  const [rowKeys, handleSelectedRowKeys] = useState([]);
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
      title: '商户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '男',
        },
        1: {
          text: '女',
        },
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      hideInSearch: true,
    },
    {
      title: '公司名称',
      dataIndex: 'desc',
      key: 'desc',
      hideInSearch: true,
    },
    {
      title: '微信',
      dataIndex: 'wechart',
      key: 'wechart',
      hideInSearch: true,
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '入驻时间',
      dataIndex: 'time',
      key: 'time',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        loading: {
          text: '冻结',
          status: 'error',
        },
        running: {
          text: '正常',
          status: 'Success',
        },
        online: {
          text: '审批中',
          status: 'Processing',
        },
        success: {
          text: '已处理',
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
          key="subscribeAlert"
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          详情
        </a>,
        <Popconfirm
          placement="bottomRight"
          title={item.status === 'loading' ? '是否确定解冻?' : '是否确定冻结?'}
          onConfirm={() => {
            confirm(item.status === 'loading' ? '解冻成功!' : '冻结成功!');
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>{item.status === 'running' ? '冻结' : '解冻'}</a>
        </Popconfirm>,
        <a onClick={() => {
          handleModalBroadVisible(true)
          handleIds([item.key])
        }}>广播</a>,
      ],
    },
  ];
  const rowSelection = {
    onChange(selectedRowKeys: any) {
      handleSelectedRowKeys(selectedRowKeys);
      handleIds(selectedRowKeys)
    }
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        rowSelection={rowSelection}
        toolBarRender={() => [
          rowKeys.length ? (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalBroadVisible(true);
              }}
            >
              批量广播
            </Button>
          ) : null,
        ]}
        request={(params) => queryRule({ ...params })}
        columns={columns}
      />
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
    </PageContainer>
  );
};

export default TableList;
