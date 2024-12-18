"use client"
import React from 'react'
import GetCampComponent from '@/components/getCampComponent'
import CreateCamp from '@/components/createCampComponent'
import { Analytics } from '@/components/analytics'
const Dashboard = () => {
  return (
    <div>
      <CreateCamp />
      <GetCampComponent />
      <Analytics />
    </div>
  )
}

export default Dashboard
