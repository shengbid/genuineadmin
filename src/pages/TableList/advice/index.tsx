
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FormattedMessage } from 'umi';
import { queryList } from './service';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  hideInForm: true,
}, {
  title: '描述',
  dataIndex: 'desc',
  key: 'desc',
  hideInForm: true,
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  initialValue: 'loading',
  valueEnum: {
    loading: {
      text: '待处理',
      status: 'Default',
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
      编辑
    </a>,
    <a key="subscribeAlert" onClick={() => {}}>
      删除
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
const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [visible, handleModalVisible] = useState<boolean>(false)

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
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={(params) => queryRule({ ...params })}
        columns={columns}
      >

      </ProTable>
    </PageContainer>
  );
};

export default TableList;
