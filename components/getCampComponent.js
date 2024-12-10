"use client"
import { useRakshakContext } from '@/contexts/RakshakContext'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

const GetCampComponent = () => {
  const [camps, setCamps] = useState([])
  const { getAllCamps } = useRakshakContext()

  const parseCampData = (data) => {
    if (!data ) {
      console.log("Invalid data format:", data)
      return []
    }

    return data[0].map((_, index) => ({
      id: data[0][index],
      name: data[1][index],
      location: data[2][index],
      date: data[3][index],
      isInDanger: data[4] ? data[4][index] : "Unknown"
    }))
  }

  useEffect(()=>{
    async function fetchCamps() {
      try {
        const rawCampData = await getAllCamps() 
        console.log("Raw camp data retrieved:", rawCampData) 
    
        const parsedCamps = parseCampData(rawCampData) 
        setCamps(parsedCamps) 
      } catch (error) {
        console.error("Error retrieving camp data:", error)
      }
    }
    fetchCamps()
  }, [getAllCamps])
  
  

  return (
    <div className='grid grid-cols-3 gap-x-2'>
      {camps.length > 0 ? (
        camps.map((camp) => (
          <div key={camp.id}>
            <Link href={`/camp/${camp.id}`}>
            <Card className="w-[350px] mr-4 mb-4">
              <CardHeader>
                <CardTitle>{camp.name}</CardTitle>
                <CardDescription>Location: {camp.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Date: {camp.date}</p>
                <p>Status: {camp.isInDanger ? "Alert" : "Safe"}</p>
              </CardContent>
              <CardFooter>
                <p>Related Data: {camp.isInDanger}</p>
              </CardFooter>
            </Card>
            </Link>
          </div>
        ))
      ) : (
        <p>No camps available</p>
      )}
    </div>
  )
}

export default GetCampComponent
