"use client"
import LandingPage from '@/components/landingPage'
import React, {useEffect, useState} from 'react'

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient ? <LandingPage /> : "Rendered on Server"}</div>;
}

export default Home
