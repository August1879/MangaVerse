import type { Work, ApiResponse } from '@/types/work'

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE ||
  (process.env.NEXT_PUBLIC_VERCEL_URL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ||
  'http://localhost:3000'

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  let data
  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    throw new Error(data?.error || `API error: ${res.status}`)
  }

  return data
}

export const WorksAPI = {
  list: () => apiFetch<Work>('/api/works'),
  get: (id: number) => apiFetch<Work>(`/api/works/${id}`),
  create: (data: Partial<Work>) =>
    apiFetch<Work>('/api/works', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Work>) =>
    apiFetch<Work>(`/api/works/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id: number, data: Partial<Work>) =>
    apiFetch<Work>(`/api/works/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: number) =>
    apiFetch<Work>(`/api/works/${id}`, { method: 'DELETE' }),
}
