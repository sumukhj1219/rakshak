"use client"
import React from 'react'
import GetCampComponent from '@/components/getCampComponent'
import CreateCamp from '@/components/createCampComponent'
const Dashboard = () => {
  return (
    <div>
      <CreateCamp />
      <GetCampComponent />
    </div>
  )
}

export default Dashboard
