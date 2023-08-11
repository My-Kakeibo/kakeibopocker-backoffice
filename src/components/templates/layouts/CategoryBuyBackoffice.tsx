'use client';

import PageContainer from '@/components/organisms/layouts/PageContainer';
import { useGetCategoryBuys } from '@/services/master-data/category-buys/hook';
import { Button, Space, Table } from 'antd';

export default function CategoryBuyBackoffice() {
  const dataHook = useGetCategoryBuys({});

  return (
    <PageContainer
      title="Category Buys"
      breadcrumbs={[{ title: 'Dashboard', href: '/backoffice' }, { title: 'Category Buys' }]}
      extra={
        <Space>
          <Button type="primary">Add Item</Button>
        </Space>
      }
    >
      <Table
        dataSource={dataHook.data?.items}
        columns={[
          {
            title: '#',
          },
          { title: 'Name' },
        ]}
        rowKey={(record) => record.id}
        loading={dataHook.isFetching}
        pagination={dataHook.data?.meta}
        onChange={() => {}}
      />
    </PageContainer>
  );
}
