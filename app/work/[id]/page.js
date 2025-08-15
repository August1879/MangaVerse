import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '../../../lib/prisma';

export default async function WorkPage({ params }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const w = await prisma.work.findUnique({
    where: { id },
  });

  if (!w) {
    return notFound();
  }

  return (
    <div className="container">
      <Link href="/">← Back</Link>
      <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
        <img
          src={w.coverUrl || '/covers/cover1.svg'}
          style={{ width: 320, height: 420, objectFit: 'cover', borderRadius: 8 }}
        />
        <div>
          <h1>{w.title}</h1>
          <p style={{ color: '#666' }}>{w.author}</p>
          <p style={{ marginTop: 8 }}>{w.description}</p>
          <div style={{ marginTop: 12 }}>
            <Link href={`/work/${w.id}/reader`}>
              <button style={{ padding: '8px 12px' }}>Read (vertical)</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
