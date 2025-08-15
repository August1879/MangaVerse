import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const { email, password } = body
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || (password !== 'demo' && password !== user.password)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401 })
  }

  return NextResponse.json({
    ok: true,
    token: 'demo-token',
    user: { id: user.id, email: user.email, username: user.username },
  })
}
