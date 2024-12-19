import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LocateFixed } from 'lucide-react'

const LiveTrackerCompoent = () => {
  return (
    <div>
      <Link href={'/'}>
        <Button><LocateFixed /> Track Location</Button>
      </Link>
    </div>
  )
}

export default LiveTrackerCompoent
