import React from 'react'
import '../Catalog/Category.css';
import { Link, Outlet } from 'react-router-dom';

export const TabButtons = () => {
  return (
    <>
      <ul className="category-tab-buttons">
        <li><Link to='/adminpage/addingcategory/mainlevel'>Основные категории <i class="fa fa-add"></i></Link></li>
        <li><Link to='/adminpage/addingcategory/level-1'>Категории уровен 1 <i class="fa fa-add"></i></Link></li>
        <li><Link to='/adminpage/addingcategory/level-2'>Категории уровен 2 <i class="fa fa-add"></i></Link></li>
      </ul>
      <Outlet />
    </>
  )
}
