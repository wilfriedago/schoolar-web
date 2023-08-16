import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { ApiConstants } from '@/shared/constants'

const { routes } = ApiConstants

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' }
      },
      async authorize(credentials) {
        const res = await fetch(routes.auth.signin, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...credentials })
        })

        const user = await res.json()

        if (res.ok && user) return user

        if (res.status === 401 || res.status === 403) throw new Error(user.message)

        if (res.status === 500) throw new Error(user.message)

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 60 * 60 // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      // eslint-disable-next-line no-param-reassign
      if (user) token.accessToken = user.accessToken
      return token
    },
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.accessToken = token.accessToken
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)
