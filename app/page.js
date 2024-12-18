"use client"
import { FeaturesSectionDemo } from '@/components/landingPage'
import React, {useEffect, useState} from 'react'

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient ? <FeaturesSectionDemo /> : "Rendered on Server"}</div>;
}

export default Home
