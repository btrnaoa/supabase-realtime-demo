import { db } from "@/lib/db"
import { message } from "@/lib/schema"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const messages = await db.select().from(message).orderBy(message.createdAt)
  return NextResponse.json(messages)
}

export async function POST(req: NextRequest) {
  const res = await req.json()
  const msg = await db
    .insert(message)
    .values({
      content: res.content,
    })
    .returning()
  return NextResponse.json(msg)
}
