import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(req) {
  console.log("[/api/mobile/login] Incoming request");

  let body = {};
  try {
    body = await req.json();
    console.log("[/api/mobile/login] Request body:", body);
  } catch (err) {
    console.error("[/api/mobile/login] Failed to parse JSON body:", err);
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { email, password } = body;

  if (!email || !password) {
    console.warn("[/api/mobile/login] Missing email or password");
    return NextResponse.json({ ok: false, error: "Missing email or password" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("[/api/mobile/login] Prisma returned user:", user);

    if (!user || (password !== 'demo' && password !== user.password)) {
      console.warn("[/api/mobile/login] Invalid credentials for email:", email);
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401 });
    }

    console.log("[/api/mobile/login] Login successful for:", email);

    return NextResponse.json({
      ok: true,
      token: 'demo-token',
      user: { id: user.id, email: user.email, username: user.username },
    });

  } catch (err) {
    console.error("[/api/mobile/login] Database error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
