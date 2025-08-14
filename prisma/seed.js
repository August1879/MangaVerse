const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  const user = await prisma.user.create({
    data: { email: 'demo@local', username: 'demo', password: 'demo' }
  })
  const works = [
    { title: 'Starbound Hearts', author: 'Yuna K.', description: 'Sci-fi romance with slow-burn.', genreTags: ['romance','sci-fi','school'], ratingAvg: 8.6, coverUrl:'/covers/cover1.svg', chapters:2 },
    { title: 'Blade of Dawn', author: 'K. Arata', description: 'High-action fantasy with a cursed tower.', genreTags: ['action','fantasy'], ratingAvg: 9.1, coverUrl:'/covers/cover2.svg', chapters:3 },
    { title: 'Cafe After Rain', author: 'Min Seo', description: 'Wholesome slice-of-life with light mystery.', genreTags: ['slice-of-life','comedy'], ratingAvg: 8.2, coverUrl:'/covers/cover3.svg', chapters:1 },
    { title: 'Iron Circuit', author: 'R. Takumi', description: 'Cyberpunk engineers moonlight as vigilantes.', genreTags: ['cyberpunk','action','tech'], ratingAvg: 8.8, coverUrl:'/covers/cover4.svg', chapters:2 },
    { title: 'Paper Lantern Court', author: 'A. Zhang', description: 'Court intrigue where gossip is a weapon.', genreTags: ['historical','comedy','romance'], ratingAvg: 9.0, coverUrl:'/covers/cover5.svg', chapters:2 }
  ]
  for (const w of works) {
    await prisma.work.create({ data: w })
  }
  console.log('Seeded demo user and works')
}
main().catch(e=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
