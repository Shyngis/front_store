import React from 'react'
import { Header } from '../Common/Header'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { Main } from '../Category/Main'
import { AddingCategory } from '../AdminDashboard/AddingCategory'
import { Category } from '../Category/Category'
import AddingProducts from '../AdminDashboard/AddingProducts';
import { CatalogProducts } from '../Catalog/CatalogProducts'
import { Login } from '../Common/Login'
import { AdminPage } from '../AdminDashboard/AdminPage'
import { Footer } from '../Common/Footer'

export const Pages = () => {
  return (
    <>
    <Router>
    <Header />
    <Routes>
    <Route path ='/' element={<Main />} />
    <Route path='/adminpage/addingcategory' element={<AddingCategory />} />
    <Route path='/category' element={<Category />} />
    <Route path='/adminpage/addingproducts' element={<AddingProducts />} />
    <Route path='/catalogproducts' element={<CatalogProducts />} />
    <Route path='/login' element={<Login />} />
    <Route path='/adminpage' element={<AdminPage />} />
    </Routes>
    <Footer />
    </Router>
    </>
  )
}
