import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const AdminpageHeader = () => {
  return (
    <div className='sure'>

      <ul className="admin-category">
        <li><Link to='/adminpage/category'>Категории</Link></li>
        <li><Link to='/adminpage/product'>Продукт</Link></li>
        <li><Link to='/adminpage/prodlisting'>Crud</Link></li>
      </ul>
      <div>
        <Outlet />

      </div>
    </div>
  )
}
