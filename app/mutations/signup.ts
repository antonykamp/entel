import { Ctx, SecurePassword } from "blitz"
import db from "db"

export default async function signup(userData, context: Ctx) {
  const hashedPassword = await SecurePassword.hash(userData.password.trim())
  await db.user.create({
    data: {
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      hashedPassword: hashedPassword,
      role: "USER",
    },
    select: { email: true },
  })
  return { email: userData.email, password: userData.password }
}
