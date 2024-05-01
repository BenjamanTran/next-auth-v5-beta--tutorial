import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.vertificationToken.findFirst(
      { where: { email } }
    )

    return verificationToken
  } catch (error) {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.vertificationToken.findUnique(
      { where: { token } }
    )

    return verificationToken
  } catch (error) {
    return null
  }
}
