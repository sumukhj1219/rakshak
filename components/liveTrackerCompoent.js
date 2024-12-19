import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LocateFixed } from 'lucide-react'

const LiveTrackerCompoent = () => {
  return (
    <div>
      <Link href={'https://1451-103-39-127-37.ngrok-free.app'}>
        <Button><LocateFixed /> Track Location</Button>
      </Link>
    </div>
  )
}

export default LiveTrackerCompoent
