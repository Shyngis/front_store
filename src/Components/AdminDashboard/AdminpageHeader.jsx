import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const AdminpageHeader = () => {
  return (
    <div className='sure'>
    
   <ul>
    <li><Link to='/adminpage/addingcategory'>Dob/categ</Link></li>
    <li><Link to='/adminpage/addingproducts'>Dob/prod</Link></li>
    <li><Link to='/adminpage/crud'>Crud</Link></li> 
    </ul>
    <div>
    <Outlet />
   
   </div>
   </div> 
  )
}
