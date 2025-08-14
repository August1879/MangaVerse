'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Reader({ params }) {
  const workId = params.id
  const [chapters, setChapters] = useState([])
  useEffect(()=> {
    fetch(`/api/work/${workId}/chapters`).then(r=>r.json()).then(d=> setChapters(d.items || []))
  },[workId])
  if (!chapters.length) return <div style={{padding:40}}>Loading...</div>
  const chapter = chapters[0]
  return (
    <div style={{padding:20, maxWidth:900, margin:'0 auto'}}>
      <h2>{chapter.title}</h2>
      <div style={{display:'flex', flexDirection:'column', gap:24}}>
        {chapter.pages.map((p, i) => (
          <img key={i} src={p} alt={`page ${i+1}`} style={{width:'100%', objectFit:'contain', borderRadius:8}} loading={i<3?'eager':'lazy'} />
        ))}
      </div>
    </div>
  )
}
