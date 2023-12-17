import React from 'react'
import { Header } from '../Common/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import { ProdListing } from '../AdminDashboard/AddprodCrud/ProdListing'
import { ProdCreate } from '../AdminDashboard/AddprodCrud/ProdCreate'
import { ProdEdit } from '../AdminDashboard/AddprodCrud/ProdEdit'
import { ProdDetail } from '../AdminDashboard/AddprodCrud/ProdDetail'
import { ProdCreate2 } from '../AdminDashboard/AddprodCrud/ProdCreate2'

import { CategoryByLevelOne } from '../AdminDashboard/CategoryByLevel/CategoryByLevelOne'
import { CategoryByLevelTwo } from '../AdminDashboard/CategoryByLevel/CategoryByLevelTwo'
import { CategoryByMainLevel } from '../AdminDashboard/CategoryByLevel/CategoryByMainLevel'

import { Hello } from '../AdminDashboard/Hello'

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
   <Route path='/adminpage' element={<AdminPage />} >    
    <Route path='addingcategory' element={<AddingCategory />} />
    <Route path='addingproducts' element={<AddingProducts />} />
    <Route path='prodlisting' element={<ProdListing />} />
    <Route path='prodlisting/prodcreate' element={<ProdCreate />} />
    <Route path='prodlisting/prodcreate/prodcreate2' element={<ProdCreate2 />} />
    <Route path='proddetail/:empid' element={<ProdDetail />} /> 
    <Route path='prodedit/:empid' element={<ProdEdit />} />
    


    
    </Route>
    </Routes>
    </Router>
    </>
  )
}
