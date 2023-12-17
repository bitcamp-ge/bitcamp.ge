import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const services = await prisma.programs.findMany()

    return new Response(JSON.stringify(services))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
