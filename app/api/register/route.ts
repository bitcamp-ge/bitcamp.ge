import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import * as z from "zod"

import { db } from "@/lib/db"
import { NewUserAuthSchema } from "@/lib/validations/new-user-auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, username, password } = NewUserAuthSchema.parse(body)

    // Check if email already exists
    const exisitingUserByEmail = await db.newUser.findUnique({
      where: {
        email: email,
      },
    })

    if (exisitingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Check if username already exists
    const exisitingUserByUsername = await db.newUser.findUnique({
      where: {
        username: username,
      },
    })

    if (exisitingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exists" },
        { status: 409 }
      )
    }

    // Create new User
    const hashedPassword = await hash(password, 10)
    const newUser = await db.newUser.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })
    const { password: newUserPassword, ...rest } = newUser

    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    )
  }
}
