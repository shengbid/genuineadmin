
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import { queryList, setSugestionStatus } from './service';
import Detail from '@/components/Detail';
import Broadcast from '@/components/Broadcast';

const queryRule = async (fieds: any) => {
  const res = await queryList({ ...fieds })
  return {
    success: true,
    total: res.data.total,
    data: res.data.records,
  }
}
const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [visible, handleModalVisible] = useState<boolean>(false)
  const [broadVisible, handleModalBroadVisible] = useState<boolean>(false);
  const [rowKeys, handleSelectedRowKeys] = useState([]);
  const [ids, handleIds] = useState<any[]>([]);
  const [id, handleId] = useState<string | number>('');

  const confirm = async(key: number | string) => {
    await setSugestionStatus(key)
    message.success('标记成功');
    actionRef?.current.reload()
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    message.success('留言成功!');
    handleModalBroadVisible(false);
    actionRef?.current.reload()
  }

  const columns = [
    {
      title: '用户类型',
      dataIndex: 'type',
      key: 'type',
      valueEnum: {
        0: {
          text: '牛人',
        },
        1: {
          text: '商户',
        }
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        0: {
          text: '未处理',
          status: 'Processing',
        },
        1: {
          text: '已处理',
          status: 'Success',
        },
      },
    },
    {
      title: '反馈时间',
      dataIndex: 'complateTime',
      key: 'complateTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '建议内容',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
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
            handleModalVisible(true);
            handleId(item.id)
          }}
        >
          详情
        </a>,
        <Popconfirm
          placement="bottomRight"
          title={'是否确定标记为已处理?'}
          onConfirm={() => {
            confirm(item.id);
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>标记处理</a>
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
            <><Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalBroadVisible(true);
              }}
            >
              批量广播
            </Button>
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalBroadVisible(true);
              }}
            >
              批量标记
            </Button></>
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
        id={id}
        onCancel={() => {
          handleModalVisible(false);
        }}
        modalVisible={visible}
      /> : null}
    </PageContainer>
  );
};

export default TableList;
