'use client';

import PageContainer from '@/components/organisms/layouts/PageContainer';
import AsyncModal from '@/components/organisms/modals/AsyncModal';
import { TUserResponse } from '@/services/master-data/users/entities/response';
import { useGetUsers } from '@/services/master-data/users/hook';
import { getnumberColumn } from '@/utils/antd/table';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import UserForm, { useUserForm } from './UserForm';
import { useGlobalFilter } from '@/utils/hooks/useFilter';
import { TUserParams } from '../entities/request';

export default function UserBackoffice() {
  const filterHook = useGlobalFilter<TUserParams, TUserResponse>();
  const dataHook = useGetUsers({
    params: filterHook.params,
  });

  const {
    form,
    setFields,
    createMutation,
    onCreate,
    updateMutation,
    onUpdate,
    deleteMutation,
    onDelete,
  } = useUserForm(dataHook);

  return (
    <PageContainer
      title="Users"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice' },
        { title: 'Users' },
      ]}
      extra={
        <Space>
          <AsyncModal
            title="Update"
            button={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => form.resetFields()}
              >
                Add Item
              </Button>
            }
            mutation={createMutation}
            onSubmit={form.submit}
          >
            <UserForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Table
        dataSource={dataHook.data?.items}
        columns={[
          getnumberColumn<TUserResponse>(),
          { title: 'Email', dataIndex: 'email' },
          { title: 'Full Name', dataIndex: 'fullname' },
          {
            title: 'Action',
            dataIndex: 'id',
            width: 50,
            align: 'right',
            fixed: 'right',
            render: (_, record) => (
              <Space>
                <AsyncModal
                  title="Update"
                  button={
                    <Button
                      icon={<EditOutlined />}
                      size="small"
                      type="link"
                      onClick={() => setFields(record)}
                    />
                  }
                  mutation={updateMutation}
                  onSubmit={form.submit}
                >
                  <UserForm form={form} onFinish={() => onUpdate(record.id)} />
                </AsyncModal>

                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  type="link"
                  danger
                  loading={deleteMutation.isLoading}
                  onClick={() => onDelete(record.id)}
                />
              </Space>
            ),
          },
        ]}
        rowKey={(record) => record.id}
        loading={dataHook.isFetching}
        pagination={dataHook.data?.meta}
        onChange={filterHook.pagination.onChange}
      />
    </PageContainer>
  );
}
