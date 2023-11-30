import React from 'react'
import { social } from './ddata'
import './Footer.css'

export const Footer = () => {
  return (
    <>
      <footer>
        <div className='iconsa'>
        {social.map((item)=>(
            <a href={item.hr} target='blank' class="text-white">
            <i>{item.icon}</i> </a>
          
        ))} </div>
        <p>All Right Rescved </p> 
        
      </footer>
    </>
  )
}
