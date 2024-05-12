import { v4 as uuidv4 } from 'uuid'
import { db } from './db'
import { getVerificationTokenByEmail } from '@/data/verification-token'
import { getPasswordResetByEmail } from '@/data/password-reset-token'
import crypto from 'crypto'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  //todo: change to 15 minutes
  const expires = new Date(new Date().getTime() + 3600 * 1000)
  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires
    }
  })
}

export const generateResetPasswordToken = async (email: string) => {
  try {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await getPasswordResetByEmail(email)

    if (existingToken) {
      await db.passwordResetToken.delete({
        where: { id: existingToken.id }
      })
    }

    const verificationToken = await db.passwordResetToken.create({
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
