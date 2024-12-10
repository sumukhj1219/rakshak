"use client"
import React from 'react'
import { useRakshakContext } from '@/contexts/RakshakContext'
import { Button } from '@/components/ui/button'
import { IndianRupee } from 'lucide-react'

const DashboardLayout = ({children}) => {
  const {account} = useRakshakContext()
  return (
    <div className='mt-10 p-4 m-4  max-w-7xl mx-auto'>
      <Button variant={'outline'} className="m-2"><IndianRupee />Account : {account}</Button>
      {children}
    </div>
  )
}

export default DashboardLayout
