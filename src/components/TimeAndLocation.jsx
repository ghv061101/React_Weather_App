import React from 'react'

const TimeAndLocation = () => {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-xl font-extralight'>
                Sunday, 20 Oct 2024 | Local time: 5:10 PM
            </p>
        </div>
        <div className='flex items-center justify-center my-3'>
            <p className='text-3xl font-m'>Berlin, DE</p>
        </div>
    </div>
  )
}

export default TimeAndLocation