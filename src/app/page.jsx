import React from 'react'
import dynamic from 'next/dynamic'

import Login from '@/components/login'
import Loader from '@/components/loader'

function Home() {

  return (
    <div>

      <Login />
    </div>
  )
}

export default Home