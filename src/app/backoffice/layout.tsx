'use client';

import NavBar from '@/components/organisms/layouts/NavBar';
import SideBar from '@/components/organisms/layouts/SideBar';
import { Layout } from 'antd';

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />

      <Layout>
        <NavBar />
        <Layout.Content>{children}</Layout.Content>

        <Layout.Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
