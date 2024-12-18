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
import { Button } from './ui/button'
import { ArrowBigRightIcon } from 'lucide-react'
import { Separator } from './ui/separator'

const GetCampComponent = () => {
  const [camps, setCamps] = useState([])
  const { getAllCamps, raiseAlert, resetAlert } = useRakshakContext()

  const handleDanger = async (campId) => {
    try {
      await raiseAlert(campId)
      setCamps((prevCamps) =>
        prevCamps.map((camp) =>
          camp.id === campId ? { ...camp, isInDanger: true } : camp
        )
      )
    } catch (error) {
      console.log("Error raising alert:", error)
    }
  }

  const handleSafe = async (campId) => {
    try {
      await resetAlert(campId) 
      setCamps((prevCamps) =>
        prevCamps.map((camp) =>
          camp.id === campId ? { ...camp, isInDanger: false } : camp
        )
      )
    } catch (error) {
      console.log("Error resetting alert:", error)
    }
  }

  const parseCampData = (data) => {
    if (!data) {
      console.log("Invalid data format:", data)
      return []
    }

    return data[0].map((_, index) => ({
      id: data[0][index],
      name: data[1][index],
      location: data[2][index],
      date: data[3][index],
      isInDanger: data[4] ? data[4][index] : false,
    }))
  }

  useEffect(() => {
    async function fetchCamps() {
      try {
        const rawCampData = await getAllCamps()
        console.log("Raw camp data retrieved:", rawCampData)

        const parsedCamps = parseCampData(rawCampData)
        setCamps(parsedCamps)
      } catch (error) {
        console.log("Error retrieving camp data:", error)
      }
    }
    fetchCamps()
  }, [getAllCamps])

  return (
    <div className='grid grid-cols-3 gap-x-2'>
      {camps.length > 0 ? (
        camps.map((camp) => (
          <div key={camp.id}>
            <Card className={`w-[350px] mr-4 mb-4 ${camp.isInDanger ? 'bg-red-400 transition-colors animate-pulse 1s repeat-infinite' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle>{camp.name}</CardTitle>
                <Separator orientation="horizontal" className="mt-2" />
                <CardDescription>Location: {camp.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>Date: {camp.date}</p>
                {!camp.isInDanger ? (
                  <Button variant={'destructive'} className="mt-2 font-bold" onClick={() => handleDanger(camp.id)}>
                    Emergency Signal 📞
                  </Button>
                ) : (
                  <Button variant={'success'} className="mt-2 font-bold" onClick={() => handleSafe(camp.id)}>
                    Rescue ⛑️
                  </Button>
                )}
              </CardContent>
              <CardFooter>
                <Link href={`/camp/${camp.id}`}>
                  <Button size={'sm'}>
                    View Camp <ArrowBigRightIcon />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <p>No camps available</p>
      )}
    </div>
  )
}

export default GetCampComponent
