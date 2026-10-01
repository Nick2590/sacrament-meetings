import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const credentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const submittedCredentials = credentialsSchema.safeParse(credentials);
        const username = process.env.AUTH_USER;
        const password = process.env.AUTH_PASSWORD;

        if (
          !submittedCredentials.success ||
          !username ||
          !password ||
          submittedCredentials.data.username !== username ||
          submittedCredentials.data.password !== password
        ) {
          return null;
        }

        return { id: username, name: 'Bishopric member' };
      },
    }),
  ],
});