import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { getAllCompanion, getRecentsSession } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Page =  async() => {
  const companions = await getAllCompanion({limit:3})
  const recentSessionsCompanion = await getRecentsSession(10)
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>
      <section className='home-section'>
        {companions.map((companion) => (
          <CompanionCard 
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
      <section className='home-section'>
        <CompanionList
          title="Recently completed session"
          companions={recentSessionsCompanion}
          className="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
  </main>
  )
}

export default Page