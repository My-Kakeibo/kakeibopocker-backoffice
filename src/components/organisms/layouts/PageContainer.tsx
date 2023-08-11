'use client';

import { Breadcrumb, BreadcrumbProps, Layout, Space, Typography } from 'antd';
import Link from 'next/link';

type PageContainerProps = {
  title: string;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbProps['items'];
  extra?: React.ReactNode;
};

export default function PageContainer(props: PageContainerProps) {
  const { title, children, breadcrumbs, extra } = props;

  const breadcrumbItems =
    breadcrumbs?.map((item) => ({
      title: item.href ? (
        <Link href={item.href || '#'}>{item.title}</Link>
      ) : (
        item.title
      ),
    })) || [];

  return (
    <div
      className="container"
      style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      {breadcrumbs?.length ? <Breadcrumb items={breadcrumbItems} /> : null}

      <Space
        style={{
          marginBottom: '.5rem',
          width: '100%',
          justifyContent: 'space-between',
        }}
        align="center"
      >
        <Typography.Title level={2} style={{ marginTop: '.5rem' }}>
          {title}
        </Typography.Title>

        <Space>{extra}</Space>
      </Space>

      <Layout>{children}</Layout>
    </div>
  );
}
