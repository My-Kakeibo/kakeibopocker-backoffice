'use client';

import { NavBar, SideBar } from '@/components';
import { Layout } from 'antd';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />

      <Layout>
        <NavBar />
        <Layout.Content
          style={{
            padding: '1rem',
          }}
        >
          <div>{children}</div>
        </Layout.Content>

        <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Layout.Footer>
      </Layout>
    </Layout>
  );
}
