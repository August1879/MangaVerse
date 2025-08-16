import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all works
export async function GET() {
  try {
    const works = await prisma.work.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        title: true,
        author: true,
        description: true,
        genreTags: true,
        ratingAvg: true,
        status: true,
        coverUrl: true,
        chapters: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, items: works }, { status: 200 });
  } catch (error) {
    console.error('Error fetching works:', error);
    return NextResponse.json({ ok: false, error: 'Failed to fetch works' }, { status: 500 });
  }
}

// POST a new work
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ ok: false, error: 'Title is required' }, { status: 400 });
    }

    const newWork = await prisma.work.create({
      data: {
        title: body.title,
        author: body.author || null,
        description: body.description || null,
        genreTags: body.genreTags || '',
        ratingAvg: body.ratingAvg ?? 0,
        status: body.status || 'ONGOING',
        coverUrl: body.coverUrl || null,
        chapters: body.chapters ?? 1,
      },
    });

    return NextResponse.json({ ok: true, item: newWork }, { status: 201 });
  } catch (error) {
    console.error('Error creating work:', error);
    return NextResponse.json({ ok: false, error: 'Failed to create work' }, { status: 500 });
  }
}
