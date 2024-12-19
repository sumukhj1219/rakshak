import Image from 'next/image'
import React from 'react'

const LandingPage = () => {
  return (
    <div className='flex items-center justify-center mx-auto'>
      <Image
      src={'/black-ops.jpg'}
      width={1920}
      height={1024}
      alt='background'
      className='object-cover brightness-50 hover:brightness-90 transition-all duration-1000'
      />
    </div>
  )
}

export default LandingPage
