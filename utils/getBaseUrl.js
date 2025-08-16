export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Running in the browser — relative URLs work
    return '';
  }
  // Running on the server — need absolute URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local dev fallback
  return 'http://localhost:3000';
}
