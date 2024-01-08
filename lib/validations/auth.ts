import * as z from "zod"

export const userAuthSchema = z.object({
  username: z.string().min(3).max(100),
  first_name: z.string().min(3).max(100).optional(),
  last_name: z.string().min(3).max(100).optional(),
  email: z.string().email(),
  phone_number: z.string().min(9).max(16).optional(),
  password: z.string().min(8).max(30) 
})
