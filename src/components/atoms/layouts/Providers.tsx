'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, ThemeConfig } from 'antd';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers(props: ProvidersProps) {
  const { children } = props;

  /**
   * Ant Design Theme COnfiguration
   */
  const theme: ThemeConfig = {
    components: {
      Menu: {
        itemHeight: 36,
      },
    },
    token: {
      fontFamily: `'Poppins', sans-serif`,
      colorPrimary: '#00b96b',
      fontSize: 12,
      borderRadius: 4,
    },
  };

  /**
   * React Query Configuration
   */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
          },
        },
      }),
  );

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
