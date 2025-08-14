import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req, { params }) {
  const id = String(params.id)
  try {
    const publicDir = path.join(process.cwd(), 'public', 'chapters', id)
    if (!fs.existsSync(publicDir)) return NextResponse.json({ ok:true, items: [] })
    const chdirs = fs.readdirSync(publicDir).filter(f => fs.statSync(path.join(publicDir,f)).isDirectory()).sort()
    const items = chdirs.map(ch => {
      const pages = fs.readdirSync(path.join(publicDir,ch)).filter(f => /\.(jpe?g|png|webp|svg)$/i.test(f)).sort()
      const urls = pages.map(p => `/chapters/${id}/${ch}/${p}`)
      return { id: ch, title: ch, pages: urls }
    })
    return NextResponse.json({ ok:true, items })
  } catch (e) {
    return NextResponse.json({ ok:false, error: String(e) }, { status:500 })
  }
}
