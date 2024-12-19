"use client"
import React from 'react'
import { useRakshakContext } from '@/contexts/RakshakContext'
import { Button } from '@/components/ui/button'
import { IndianRupee, Settings } from 'lucide-react'
import Link from 'next/link'
import LiveTrackerCompoent from '@/components/liveTrackerCompoent'

const DashboardLayout = ({children}) => {
  const {account} = useRakshakContext()
  return (
    <div className='mt-10 p-4 m-4  max-w-7xl mx-auto'>
      <Button variant={'outline'} className="m-2 w-48 hover:w-1/3 transition-all duration-1000 "><IndianRupee />Account :<span className='text-ellipsis hover:w-full transition-all duration-1000 overflow-hidden hover:overflow-visible'>{account}</span></Button>
      <div className='flex'>
      <Link href={'/settings'} className='mr-4'>
      <Button><Settings /> Settings</Button>
      </Link>
      <LiveTrackerCompoent />
      </div>    
      {children}
    </div>
  )
}

export default DashboardLayout
