import { auth } from '@/auth'
import UserButton from '@/components/Auth/Userbutton/Button'
import React from 'react'

const GettingStartedPage = async () => {
  const session = await auth();
  if(!session) return <p>User Not Authenticated</p>
  return (
    <div><UserButton session={session} /></div>
  )
}

export default GettingStartedPage