
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { queryList } from './service';
import Detail from './components/detail';
import type { formprops } from './components/detail';

const queryRule = async (fieds: any) => {
  const res = await queryList({ ...fieds })
  return {
    success: true,
    total: res.data.total,
    data: res.data.records
  }
}
const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [visible, handleModalVisible] = useState<boolean>(false)
  const [values, handleValues] = useState<formprops>({
    name: '',
    desc: '',
    time: ''
  });

  const handleSubmit = (value: any) => {
    console.log(value);
    message.success('修改成功!');
    handleModalVisible(false);
  }

  const columns = [
    {
      title: '文字位置',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '文字内容',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
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
      render: (_: any, item: formprops) => [
        <a
          key="subscribeAlert"
          onClick={() => {
            handleValues(item);
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,
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
