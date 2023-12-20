import React from 'react'
import { Header } from '../Common/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Main } from '../Category/Main'
import { AddingCategory } from '../AdminDashboard/AddingCategory'
import { Catalog } from '../Catalog/Catalog'

import AddingProducts from '../AdminDashboard/AddingProducts';
import { Login } from '../Common/Login'
import { AdminPage } from '../AdminDashboard/AdminPage'
import { Footer } from '../Common/Footer'
import ProductDetails from '../Catalog/ProductDetails'
import { CatalogFirstLevelCategory } from '../Catalog/CatalogFirstLevelCategory'
import { CatalogSecondLevelCategory } from '../Catalog/CatalogSecondLevelCategory'
import { Product } from '../Catalog/Product'
import { ProdListing } from '../AdminDashboard/AddprodCrud/ProdListing'
import { ProdCreate } from '../AdminDashboard/AddprodCrud/ProdCreate'
import { ProdEdit } from '../AdminDashboard/AddprodCrud/ProdEdit'
import { ProdDetail } from '../AdminDashboard/AddprodCrud/ProdDetail'
import { ProdCreate2 } from '../AdminDashboard/AddprodCrud/ProdCreate2'
import { SizeEdit } from '../AdminDashboard/AddprodCrud/SizeEdit'
import { CategoryByMainLevel } from '../AdminDashboard/CategoryByLevel/CategoryByMainLevel';
import { CategoryByLevelOne } from '../AdminDashboard/CategoryByLevel/CategoryByLevelOne';
import { CategoryByLevelTwo } from '../AdminDashboard/CategoryByLevel/CategoryByLevelTwo';


export const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='catalog' element={<Catalog />} />
          <Route path='catalog/first-level/:id' element={<CatalogFirstLevelCategory />} />          
          <Route path='catalog/first-level/:id/second-level/:secondLevelId' element={<CatalogSecondLevelCategory />} />
          {/* <Route path='category/:id' element={<Product />} /> */}

          {/* <Route path='category_1/:id/:id' element={<ProductDetails />} /> */}
          <Route path='login' element={<Login />} />
          <Route path='/adminpage' element={<AdminPage />} >

            <Route path='addingcategory' element={<AddingCategory />}>

              <Route path='mainlevel' element={<CategoryByMainLevel />} />
              <Route path='level-1' element={<CategoryByLevelOne />} />
              <Route path='level-2' element={<CategoryByLevelTwo />} />

            </Route>

            <Route path='addingproducts' element={<AddingProducts />} />
            <Route path='prodlisting' element={<ProdListing />} />
            <Route path='prodlisting/prodcreate' element={<ProdCreate />} />
            <Route path='prodlisting/prodcreate/prodcreate2' element={<ProdCreate2 />} />
            <Route path='prodlisting/prodedit/:empid' element={<ProdEdit />} />
            <Route path='prodlisting/prodedit/:empid/:sizeid' element={<SizeEdit />} />
            <Route path='prodlisting/prodcreate/proddetail/:empid' element={<ProdDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}


  // <Footer/>
  // <Route path='prodlisting/prodcreate' element={<ProdCreate />} />
  // <Route path='adminpage/prodcreate2' element={<ProdCreate2 />} />
  // <Route path='prodlisting/proddetail/:empid' element={<ProdDetail />} /> 
  // <Route path='prodlisting/prodedit/:empid' element={<ProdEdit />} />


// <Route path='/adminpage/addingproducts' element={<AddingProducts />} />
//  <Route path='/adminpage/addingcategory' element={<AddingCategory />} />