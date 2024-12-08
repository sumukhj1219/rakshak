"use client"
import { useRakshakContext } from '@/contexts/RakshakContext'
import React from 'react'

const AddSoilderComponent = () => {
  const {addSoldier} = useRakshakContext()
  function handleClick()
  {
        const camp_id = "camp_002"
        const id = "ind_camp_002"
        const name = "sumukh"
        const city = "dharwad"
        const dob = "12/2/2004"
        const reported_date = "12/12/2024"
        const rank = "Cavalry"
        const ammunitions = "Pistols, gernades, smgs, meele"
        addSoldier(camp_id, id, name, city, dob, reported_date, rank, ammunitions)
  }
  return (
    <div>
      <button onClick={handleClick}>Add new Soldier</button>
    </div>
  )
}

export default AddSoilderComponent
