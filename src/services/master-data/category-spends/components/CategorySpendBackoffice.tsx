'use client';

import PageContainer from '@/components/organisms/layouts/PageContainer';
import AsyncModal from '@/components/organisms/modals/AsyncModal';
import { TCategorySpendResponse } from '@/services/master-data/category-spends/entities/response';
import { useGetCategorySpends } from '@/services/master-data/category-spends/hook';
import { getnumberColumn } from '@/utils/table';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import CategorySpendForm, { useCategorySpendForm } from './CategorySpendForm';

export default function CategorySpendBackoffice() {
  const dataHook = useGetCategorySpends({});

  const {
    form,
    setFields,
    createMutation,
    onCreate,
    updateMutation,
    onUpdate,
    deleteMutation,
    onDelete,
  } = useCategorySpendForm();

  return (
    <PageContainer
      title="Category Spends"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice' },
        { title: 'Category Spends' },
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
            isLoading={createMutation.isLoading}
            onSubmit={onCreate}
          >
            <CategorySpendForm form={form} />
          </AsyncModal>
        </Space>
      }
    >
      <Table
        dataSource={dataHook.data?.items}
        columns={[
          getnumberColumn<TCategorySpendResponse>(),
          { title: 'Name', dataIndex: 'name' },
          { title: 'Description', dataIndex: 'description' },
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
                  isLoading={updateMutation.isLoading}
                  onSubmit={() => onUpdate(record.id)}
                >
                  <CategorySpendForm form={form} />
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
        onChange={() => {}}
      />
    </PageContainer>
  );
}
