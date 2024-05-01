import { v4 as uuidv4 } from 'uuid'
import { db } from './db'
import { getVerificationTokenByEmail } from '@/data/verification-token'


export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
      await db.vertificationToken.delete({
        where: { id: existingToken.id }
      })
    }

    const verificationToken = await db.vertificationToken.create({
      data: {
        email,
        token,
        expires
      }
    })

    return verificationToken
  } catch (error) {
    return null
  }

}
