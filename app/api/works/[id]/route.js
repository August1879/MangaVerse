import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET(req, { params }) {
  const id = Number(params.id)
  const item = await prisma.work.findUnique({ where: { id } })
  if (!item) {
    return NextResponse.json({ ok: false }, { status: 404 })
  }
  return NextResponse.json({ ok: true, item })
}
