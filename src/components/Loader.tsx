import React from 'react'

export default function Loader() {
  return (
    <section className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black
     bg-opacity-50'>
    <span className="loader"></span>
    <span className='text-WHITE font-bold'>
      Loading...
    </span>
  </section>
  )
}
