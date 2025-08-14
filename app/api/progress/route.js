import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(req) {
  const url = new URL(req.url)
  const workId = Number(url.searchParams.get('workId') || 0)
  // for preview, return null or first row
  const rec = await prisma.readingProgress.findFirst({ where: { workId } })
  return NextResponse.json({ ok:true, data: rec })
}

export async function POST(req) {
  const body = await req.json().catch(()=>({}))
  const { workId, chapterIndex=0, pageIndex=0, progressNormalized=0 } = body
  // for preview, use demo user id = 1
  const userId = 1
  if (!workId) return NextResponse.json({ ok:false, error:'workId required' }, { status:400 })
  await prisma.readingProgress.upsert({
    where: { userId_workId: { userId, workId } },
    create: { userId, workId, progress: Number(progressNormalized), chapterIndex, pageIndex },
    update: { progress: Number(progressNormalized), chapterIndex, pageIndex, updatedAt: new Date() }
  })
  return NextResponse.json({ ok:true })
}
