import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(req) {
  const works = await prisma.work.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json({ ok:true, items: works })
}
