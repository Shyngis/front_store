import React from 'react'
import { Link, Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import AddingProducts from './AddingProducts'
import { AddingCategory } from './AddingCategory'
import { Main } from '../Category/Main'

export const AdminPage = () => {
  return (
   <>
   <div>
   
   <ul>
    <li><Link to='addingcategory'>Dov/categ</Link></li>
    <li><Link to='addingproducts'>Dov/prod</Link></li>
    
   </ul>
   
   
   </div> 
   
   </>
   )
  }
  
  // <div className='add_pr'>
  // <AddingCategory />
  //  </div>
  //  <div>
  //    <AddingProducts />
  //  </div>