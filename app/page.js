export default async function Home() {
  // Detect if running on server or client
  const isServer = typeof window === 'undefined';

  let url;
  if (isServer) {
    // Absolute URL for server-side
    url =
      process.env.NEXT_PUBLIC_BASE ||
      (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
      'http://localhost:3000';
    url += '/api/works';
  } else {
    // Relative URL for client-side
    url = '/api/works';
  }

  const res = await fetch(url);
  const data = await res.json();
  const items = data?.items || [];

  return (
    <main>
      <h1>Manga Works</h1>
      <ul>
        {items.map((work, idx) => (
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