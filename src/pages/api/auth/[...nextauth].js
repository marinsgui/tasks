import NextAuth from "next-auth"

import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session(session) {
      
      try {
        return {
          ...session.session,
          id: session.token.sub
        }
      } catch(err) {
          return {
            ...session,
            id: null,
          }
      }
    },
    async signIn(user, account, profile) {
      const { email } = user

      try {
        return true
      } catch(err) {
        console.log(err)
        return false
      }
    }
  },
  secret: process.env.GITHUB_CLIENT_SECRET
})
