import React from 'react'
import { social } from './ddata'
import './Footer.css'

export const Footer = () => {
  return (
    <>
      <footer >
        <div className='iconsa'>
        {social.map((item)=>(
            <a key={item.id} href={item.hr} target='blank' className="text-white">
            <i>{item.icon}</i> 
            </a>
          
        ))} </div>
        <p>All Right Rescved </p> 
        
      </footer>
    </>
  )
}
