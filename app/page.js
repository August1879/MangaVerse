import Link from 'next/link'

export default async function Home() {
  // fetch works from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE || ''}/api/works`)
  const data = await res.json()
  const items = data?.items || []
  return (
    <div className="container">
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>MangaVerse</h1>
        <nav><Link href='/wishlist'>Wishlist</Link> | <Link href='/rewards'>Rewards</Link></nav>
      </header>
      <section style={{marginTop:20}}>
        <h2>Recommended</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16}}>
          {items.map(w => (
            <div key={w.id} className="card">
              <img src={w.coverUrl || '/covers/cover1.svg'} alt={w.title} className="cover" />
              <h3 style={{marginTop:8}}>{w.title}</h3>
              <p style={{fontSize:13, color:'#666'}}>{w.author}</p>
              <div style={{marginTop:8}}>
                <Link href={`/work/${w.id}`}>Details</Link> • <Link href={`/work/${w.id}/reader`}>Read</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
