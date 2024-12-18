"use client"
import React from 'react'
import { useRakshakContext } from '@/contexts/RakshakContext'
import { Button } from '@/components/ui/button'
import { IndianRupee } from 'lucide-react'

const CampInfoLayout = ({children}) => {
  const {account} = useRakshakContext()

  return (
    <div className='mt-10 p-4 m-4 max-w-7xl mx-auto'>
        <Button variant={'outline'} className="m-2 w-48 hover:w-1/3 transition-all duration-1000 "><IndianRupee />Account :<span className='text-ellipsis hover:w-full transition-all duration-1000 overflow-hidden hover:overflow-visible'> {account}</span></Button>
        {children}
    </div>
  )
}

export default CampInfoLayout
