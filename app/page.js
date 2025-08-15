import prisma from '../lib/prisma';

export default async function Home() {
  const works = await prisma.work.findMany({ orderBy: { id: 'asc' } });

  return (
    <main>
      <h1>Manga Works</h1>
      <ul>
        {works.map((work, idx) => (
          <li key={idx}>
            <strong>{work.title}</strong> by {work.author}
            <br />
            <em>{work.description}</em>
          </li>
        ))}
      </ul>
    </main>
  );
}