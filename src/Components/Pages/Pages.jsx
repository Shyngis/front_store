import React from 'react'
import { Header } from '../Common/Header'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { Main } from '../Category/Main'
import { AddingCategory } from '../AdminDashboard/AddingCategory'
import { Category } from '../Category/Category'
import AddingProducts from '../AdminDashboard/AddingProducts';
import { Login } from '../Common/Login'
import { AdminPage } from '../AdminDashboard/AdminPage'
import { Footer } from '../Common/Footer'
import ProductDetails from '../Catalog/ProductDetails'
import { Category_1 } from '../Catalog/Category_1'
import { Product } from '../Catalog/Product'


export const Pages = () => {
  return (
    <>
    <Router>
    <Header />
    <Routes>
    <Route path ='/' element={<Main />} />
   
    <Route path='category' element={<Category />} />
      <Route path='category/:id' element={<Category_1 />} />
        
    <Route path='category_1' element={<Category_1 />} />
      <Route path='category_1/:id' element={<Product />} />
        <Route path='category_1/:id/:id' element={<ProductDetails />} />
    <Route path='login' element={<Login />} />
   <Route path='adminpage' element={<AdminPage />} >    
    <Route path='addingcategory' element={<AddingCategory />} />
    <Route path='addingproducts' element={<AddingProducts />} />
    
    </Route>
    </Routes>
          <Footer/>
          </Router>
          </>
          )
        }
        
// <Route path='/adminpage/addingproducts' element={<AddingProducts />} />
//  <Route path='/adminpage/addingcategory' element={<AddingCategory />} />