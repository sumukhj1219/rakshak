"use client"
import { useRakshakContext } from '@/contexts/RakshakContext'
import React from 'react'

const GetCampComponent = () => {
  const {getCampData} = useRakshakContext()
  function handleClick(){
    const camp_id = "camp_002"
    getCampData(camp_id)
  }
  return (
    <div>
      <button onClick={handleClick}>Get camp data</button>
    </div>
  )
}

export default GetCampComponent
