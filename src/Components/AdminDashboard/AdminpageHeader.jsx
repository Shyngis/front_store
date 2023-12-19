import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const AdminpageHeader = () => {
  return (
    <div className='container'>

      <ul className="admin-category">
        <li><Link to='/adminpage/addingcategory'>Категории</Link></li>
        <li><Link to='/adminpage/prodlisting'>Продукты</Link></li>
        {/* <li><Link to='/adminpage/prodlisting'>Crud</Link></li> */}
      </ul>
      <div>
        <Outlet />

      </div>
    </div>
  )
}
