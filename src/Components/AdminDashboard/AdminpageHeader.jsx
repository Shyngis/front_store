import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const AdminpageHeader = () => {
  return (
    <div className='sure'>
    
   <ul>
    <li><Link to='/adminpage/addingcategory'>Dov/categ</Link></li>
    <li><Link to='/adminpage/addingproducts'>Dov/prod</Link></li>
    
   </ul>
   <div>
   <Outlet />
   </div>
   </div> 
  )
}
