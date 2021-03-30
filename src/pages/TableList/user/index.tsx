import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
// import { PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { queryList, toFreeze, toBatchMassage } from './service';
import Detail from '@/components/Detail';
import Broadcast from '@/components/Broadcast';

const queryRule = async (fieds: any) => {
  const res = await queryList({ ...fieds, type: 0 });
  return {
    success: true,
    total: res.data.total,
    data: res.data.records,
  };
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, handleModalVisible] = useState<boolean>(false);
  const [broadVisible, handleModalBroadVisible] = useState<boolean>(false);
  const [rowKeys, handleSelectedRowKeys] = useState([]);
  const [ids, handleIds] = useState<any[]>([]);
  const [id, handleId] = useState<string | number>('');

  const confirm = async(text: string, key: number | string, type: number | string) => {
    await toFreeze(key, type)
    message.success(text);
    actionRef?.current.reload()
  };

  const handleSubmit = async(values: any) => {
    await toBatchMassage({ids, message: values.text})
    message.success('留言成功!');
    handleModalBroadVisible(false);
    actionRef?.current.reload()
  }

  const columns = [
    {
      title: '名称',
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
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '微信',
      dataIndex: 'wechart',
      key: 'wechart',
      hideInSearch: true,
    },
    {
      title: '实名',
      dataIndex: 'realName',
      key: 'realName',
      hideInSearch: true,
    },
    {
      title: '注册时间',
      dataIndex: 'creatTime',
      key: 'creatTime',
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
            handleModalVisible(true);
            handleId(item.id)
          }}
        >
          详情
        </a>,
        <Popconfirm
          placement="bottomRight"
          title={item.isOpenDy === '1' ? '是否确定解冻?' : '是否确定冻结?'}
          onConfirm={() => {
            const text = item.isOpenDy === '1' ? '解冻成功!' : '冻结成功!'
            confirm(text, item.id, item.isOpenDy === '1' ? 0 : 1);
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>{item.isOpenDy === '0' ? '冻结' : '解冻'}</a>
        </Popconfirm>,
        <a onClick={() => {
          handleModalBroadVisible(true)
          handleIds([item.id])
        }}>广播</a>,
      ],
    },
  ];
  const rowSelection = {
    onChange(selectedRowKeys: any) {
      handleSelectedRowKeys(selectedRowKeys);
      handleIds(selectedRowKeys)
    },
    // onSelect(record, selected, selectedRows) {
    //   console.log(record, selected, selectedRows);
    // },
    // onSelectAll(selected, selectedRows, changeRows) {
    //   console.log(selected, selectedRows, changeRows);
    // },
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        rowSelection={rowSelection}
        toolBarRender={() => [
          // <Button
          //   type="primary"
          //   key="primary"
          //   onClick={() => {
          //     handleModalVisible(true);
          //   }}
          // >
          //   <PlusOutlined /> 新建
          // </Button>,
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
