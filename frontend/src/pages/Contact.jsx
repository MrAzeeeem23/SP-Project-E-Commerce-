import React from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  return (
    <div className='md:m-4 m-0 '>
        <div className='m-7'>
            <h1 className="text-[4rem] mb-4 uppercase tracking-[-5px] font-[999] relative ">Contact.</h1>
        </div>
        <div className='m-7'>
            <button className='w-full border-4 border-red-600 p-4 hover:bg-red-600 hover:rounded-xl transition'>
                 <a className='uppercase italic font-bold' href="mailto:azeemkh528@gmail.com">Click here for any quary</a>
            </button>
            <span className='uppercase italic font-bold mt-4 py-4'>
                OR USE SQL
            </span>
            
        </div>
    </div>
  )
}

export default Contact