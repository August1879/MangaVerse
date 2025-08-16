import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET a single work by ID
export async function GET(_req, { params }) {
  try {
    const id = Number(params.id)
    const item = await prisma.work.findUnique({ where: { id } })

    if (!item) {
      return NextResponse.json({ ok: false, error: 'Work not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, item }, { status: 200 })
  } catch (error) {
    console.error('Error fetching work:', error)
    return NextResponse.json({ ok: false, error: 'Failed to fetch work' }, { status: 500 })
  }
}

// UPDATE (replace all fields)
export async function PUT(req, { params }) {
  try {
    const id = Number(params.id)
    const body = await req.json()

    const updated = await prisma.work.update({
      where: { id },
      data: body,
    })

    return NextResponse.json({ ok: true, item: updated }, { status: 200 })
  } catch (error) {
    console.error('Error updating work:', error)
    return NextResponse.json({ ok: false, error: 'Failed to update work' }, { status: 500 })
  }
}

// PATCH (update only provided fields)
export async function PATCH(req, { params }) {
  try {
    const id = Number(params.id)
    const body = await req.json()

    const updated = await prisma.work.update({
      where: { id },
      data: body, // only updates provided keys
    })

    return NextResponse.json({ ok: true, item: updated }, { status: 200 })
  } catch (error) {
    console.error('Error patching work:', error)
    return NextResponse.json({ ok: false, error: 'Failed to patch work' }, { status: 500 })
  }
}

// DELETE a work by ID
export async function DELETE(_req, { params }) {
  try {
    const id = Number(params.id)

    await prisma.work.delete({ where: { id } })

    return NextResponse.json({ ok: true, message: 'Work deleted' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting work:', error)
    return NextResponse.json({ ok: false, error: 'Failed to delete work' }, { status: 500 })
  }
}
