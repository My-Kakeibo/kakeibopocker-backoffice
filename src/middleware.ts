import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        const isTokenExists = !!token?.accessToken;

        return isTokenExists;
      },
    },
  },
);

export const config = {
  matcher: ['/backoffice/:path*'],
};
