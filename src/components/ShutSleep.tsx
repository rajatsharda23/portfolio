import React from 'react'
import  appleLogo from '../assets/icons/apple_light/icons8-apple-100.png'

const ShutSleep = () => {
  return (
    <div className='flex h-screen w-screen fixed bg-black font-Apple_Regular text-white'>
        <div className='flex flex-col items-center justify-center h-full w-full space-y-8'>
            <div>
                <img src={appleLogo} />
            </div>
            <div className='py-4'>
                Click to wake up
            </div>
        </div>
    </div>
  )
}

export default ShutSleep