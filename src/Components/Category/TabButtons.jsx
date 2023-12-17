import React from 'react'
import './Category.css'
import { Link } from 'react-router-dom';

export const TabButtons = () => {
  return (
    <>
      <ul className="category-tab-buttons">
        <li><Link to='/adminpage/category/mainlevel'>Добавить основные категории</Link></li>
        <li><Link to='/adminpage/category/level-1'>Добавить категории уровен 1</Link></li>
        <li><Link to='/adminpage/category/level-2'>Добавить категории уровен 2</Link></li>
        <li><Link to='/adminpage/hello'>hello</Link></li>
        
      </ul>
    </>
  )
}
