'use client';

import PageContainer from '@/components/organisms/layouts/PageContainer';
import AsyncModal from '@/components/organisms/modals/AsyncModal';
import { TCategoryBuyResponse } from '@/services/master-data/category-buys/entities/response';
import { useGetCategoryBuys } from '@/services/master-data/category-buys/hook';
import { getnumberColumn } from '@/utils/antd/table';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import CategoryBuyForm, { useCategoryBuyForm } from './CategoryBuyForm';
import { useGlobalFilter } from '@/utils/hooks/useFilter';
import { TCategoryBuyParams } from '../entities/request';

export default function CategoryBuyBackoffice() {
  const filterHook = useGlobalFilter<
    TCategoryBuyParams,
    TCategoryBuyResponse
  >();
  const dataHook = useGetCategoryBuys({
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
  } = useCategoryBuyForm(dataHook);

  return (
    <PageContainer
      title="Category Buys"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice' },
        { title: 'Category Buys' },
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
            <CategoryBuyForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Table
        dataSource={dataHook.data?.items}
        columns={[
          getnumberColumn<TCategoryBuyResponse>(),
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
                  mutation={updateMutation}
                  onSubmit={form.submit}
                >
                  <CategoryBuyForm
                    form={form}
                    onFinish={() => onUpdate(record.id)}
                  />
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
