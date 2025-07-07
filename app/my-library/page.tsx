import SearchInput from '@/components/SearchInput'
import SubjectFilter from '@/components/SubjectFilter'
import React from 'react'

const MyLibrary = () => {

  // const com

  return (
    <main>
      <section className='flex justify-between gap-4 min-sm:flex-col'>
        <h1>My BookMark Companion</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
        <div className="companion-grid">
          {}
        </div>
      </section>
    </main>
  )
}

export default MyLibrary
