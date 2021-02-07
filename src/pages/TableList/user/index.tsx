
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { queryList } from './service';

const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
  hideInForm: true,
  valueEnum: {
    0: {
      text: '男'
    },
    1: {
      text: '女',
    }
  }
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  hideInForm: true,
}, {
  title: '手机',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: '微信',
  dataIndex: 'phone',
  hideInForm: true,
}, {
  title: '实名',
  dataIndex: 'desc',
  key: 'desc',
  hideInForm: true,
}, {
  title: '注册时间',
  dataIndex: 'time',
  key: 'time',
  valueType: 'date',
  hideInForm: true,
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  initialValue: 'loading',
  valueEnum: {
    loading: {
      text: '待处理',
      status: 'Default'
    },
    running: {
      text: '处理中',
      status: 'Processing',
    },
    online: {
      text: '审批中',
      status: 'Processing',
    },
    success: {
      text: '已处理',
      status: 'Success',
    }
  }
}, {
  title: '操作',
  dataIndex: 'option',
  valueType: 'option',
  render: (_, item) => [
    <a key="subscribeAlert" onClick={() => {}}>
      详情
    </a>,
    <a key="subscribeAlert" onClick={() => {}}>
      {item.sex ? '冻结' : '解冻'}
    </a>,
    <a onClick={() => {}}>
      广播
    </a>,
  ]
}]
const queryRule = async (fieds: any) => {
  const res = await queryList({ ...fieds })
  return {
    success: true,
    total: res.total,
    data: res.data
  }
}
const TableList: React.FC<routeProps> = (props) => {

  const actionRef = useRef<ActionType>();
  const [visible, handleModalVisible] = useState<boolean>(false)
  const [selectedRowKeys, handleSelectedRowKeys] = useState('')

  const rowSelection = {
    onChange(selectedRowKeys, selectedRows) {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      handleSelectedRowKeys(selectedRowKeys)
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
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        rowSelection={rowSelection}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          (selectedRowKeys && <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            批量广播
          </Button>),
        ]}
        request={(params) => queryRule({ ...params })}
        columns={columns}
      >

      </ProTable>
    </PageContainer>
  );
};

export default TableList;
