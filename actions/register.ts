'use server'
import { RegisterSchema } from '@/app/schemas'
import * as z from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid fields' }
    }
    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email already in use!" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // TODO: verification token email
    const generateToken = await generateVerificationToken(email)


    return generateToken === null ? { error: 'Something wrong!' } : { success: 'Verification email is sent!' }
}
