'use server'

import * as z from 'zod'
import { ResetPasswordSchema } from '@/app/schemas'
import { getUserByEmail } from '@/data/user'
import { generateResetPasswordToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/mail'

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validateFields = ResetPasswordSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid email!' }
  }
  const { email } = validateFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const passwordResetToken = await generateResetPasswordToken(email)
  if (passwordResetToken) {
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    )
  }

  return { success: 'Reset email send' }
} 
