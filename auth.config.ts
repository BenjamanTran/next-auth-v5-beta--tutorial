import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./app/schemas"
import { getUserByEmail } from "./data/user"
import bcrypt from 'bcryptjs'


export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const valid = LoginSchema.safeParse(credentials)
        if (valid.success) {
          const { email, password } = valid.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) {
            return null
          }
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) {
            return user
          }
        }
        return null;
      }
    })
  ]
} satisfies NextAuthConfig
