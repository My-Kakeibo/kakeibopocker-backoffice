'use client';

import './globals.css';
import { ConfigLayout } from '@/components';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <RecoilRoot>
          <ConfigLayout>{children}</ConfigLayout>
        </RecoilRoot>
      </body>
    </html>
  );
}
