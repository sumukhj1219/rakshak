import React from 'react'
import AddSoilderComponent from '@/components/addSoilderComponent'
import CreateCampComponent from '@/components/createCampComponent'
import GetCampComponent from '@/components/getCampComponent'

const Dashboard = () => {
  return (
    <div>
      <CreateCampComponent />
      <GetCampComponent />
      <AddSoilderComponent />
    </div>
  )
}

export default Dashboard
