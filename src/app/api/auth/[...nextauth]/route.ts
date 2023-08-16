import { authSignin } from '@/services/auth/api';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const resp = await authSignin({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            ...resp.data,
            id: String(resp.data.user?.id || ''),
          };
        } catch (error) {
          console.log('Failed signin: ', error);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          user: user.user,
          accessToken: user.accessToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session = {
        ...session,
        accessToken: token.accessToken,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
