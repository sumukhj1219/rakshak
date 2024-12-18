import GetCampDataComponent from '@/components/getCampDataComponent'
import React from 'react'

const CampInfo = async({params}) => {
  const {campId} = await params
  return (
    <div>
      <GetCampDataComponent campId={campId} />
    </div>
  )
}

export default CampInfo
