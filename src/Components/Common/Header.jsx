import React from 'react';
import './header.css'
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <div className='jogargysy'>
        <header>
          <input type="checkbox" name='' id='chk1' />
          <div className='logo'>
            {/* <h1>Сантехпласт</h1> */}
            </div>
          <div className="search-box">
            <form action="">
              <input type="text" name='search' id='srch' placeholder='Поиск' />
              <button type='submit'><i className='fa fa-search'></i></button>
            </form>
          </div>
          <div className='phone_numb'>
            <i className="fa-solid fa-phone"></i>
            <h4>8(700) 496-9087</h4>
          </div>
          <ul class="navbar">

            <li><Link to='/category'>Главная</Link></li>
            {/* <li>
              <a href="#">Техподдержка</a>
              <ul className='dropdown'>
                <li><a href="">Что-то новое</a></li>
                <li><a href="">Агент</a></li>
                <li><a href="">Месс</a></li>
                <li><a href="">Дуо</a></li>
              </ul>
            </li> */}
            <li><a href="">О нас</a></li>
            <li><a href="">Контакты</a></li>
            <li><Link to='/adminpage'>Admin Page</Link></li>
            <li><Link to='/login'>Вход</Link></li>

          </ul>
          <div className="menu">
            <label htmlFor="chk1">
              <i className='fa fa-bars'></i>
            </label>
          </div>

        </header>

      </div>


    </>
  )
}
