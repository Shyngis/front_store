import React from 'react';
import './header.css'
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
    <div className='jogargysy'>
      <header>
        <input type="checkbox" name='' id='chk1' />
        <div className='logo'><h1>Plumbing store</h1></div>
        <div className="search-box">
          <form action="">
              <input type="text" name='search' id='srch' placeholder='Search' />
              <button type='submit'><i className='fa fa-search'></i></button>
          </form>
          </div>
          <div className='phone_numb'>
          <i className="fa-solid fa-phone"></i>
          <h3>8(700) 496-9087</h3>
          </div>
        <ul>
         
          <li><Link to='/login'>Login</Link></li>
          
        </ul>
        <div className="menu">
          <label htmlFor="chk1">
            <i className='fa fa-bars'></i>
          </label>
        </div>
        
        </header>
       <div className='navbar'>
  <ul>
  <li><Link to='/category'>Каталог</Link></li>
    <li>
    <a href="#">Техподдержка</a>
    <ul className='dropdown'>
      <li><a href="">Что-то новое</a></li>
      <li><a href="">Агент</a></li>
      <li><a href="">Месс</a></li>
      <li><a href="">Дуо</a></li>
    </ul>
    </li>
  <li><a href="">О нас</a></li>
  <li><a href="">Контакты</a></li>
  <li><Link to='/adminpage'>Admin Dashboard</Link></li>
 
  
</ul>
</div>
      </div>
      
        
    </>
  )
}
