export interface Work {
  id: number
  title: string
  author?: string
  description?: string
  genreTags?: string[]
  ratingAvg?: number
  status?: string
  coverUrl?: string
  chapters?: number
  createdAt: string // ISO date string
}

export interface ApiResponse<T> {
  ok: boolean
  items?: T[]
  item?: T
  error?: string
  message?: string
}
