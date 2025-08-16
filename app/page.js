export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export default async function Home() {
  // Query works directly from Prisma (no fetch during SSR)
  const items = await prisma.work.findMany({
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

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manga Works</h1>
      <ul className="space-y-4">
        {items.map((work) => (
          <li key={work.id} className="border p-4 rounded-lg shadow">
            <strong className="text-lg">{work.title}</strong>{' '}
            {work.author ? `by ${work.author}` : ''}
            <br />
            <em>{work.description || 'No description available'}</em>
            <br />
            <span className="text-sm text-gray-500">
              Genre: {work.genreTags} | Status: {work.status} | Chapters: {work.chapters}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
