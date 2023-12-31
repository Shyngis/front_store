import React from "react";
import { Header } from "../Common/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddingCategory } from "../AdminDashboard/AddingCategory";
import { Catalog } from "../Catalog/Catalog";

import AddingProducts from "../AdminDashboard/AddingProducts";
import { Login } from "../Common/Login";
import { AdminPage } from "../AdminDashboard/AdminPage";
import { Footer } from "../Common/Footer";
import ProductDetails from "../Catalog/ProductDetails";
import { CatalogSubCategory } from "../Catalog/CatalogSubCategory";
import { CatalogProduct } from "../Catalog/CatalogProduct";
import { ProdListing } from "../AdminDashboard/AddprodCrud/ProdListing";
import { ProdCreate } from "../AdminDashboard/AddprodCrud/ProdCreate";
import { ProdEdit } from "../AdminDashboard/AddprodCrud/ProdEdit";
import { ProdDetail } from "../AdminDashboard/AddprodCrud/ProdDetail";
import { SizeEdit } from "../AdminDashboard/AddprodCrud/SizeEdit";
import { MainCategory } from "../AdminDashboard/CategoryByLevel/MainCategory";
import { SubCategory } from "../AdminDashboard/CategoryByLevel/SubCategory";
import { About } from "../Common/About";
import { Contacts } from "../Common/Contacts";
import { Search } from "../Common/Search";
import { SearchProductDetail } from "../Common/SearchProductDetail";

export const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />

          {/* <Route path="main" element={<Catalog />} /> */}
          <Route path="search" element={<Search />} />
          <Route path="search/product/:id" element={<SearchProductDetail />} />
          <Route path="catalog/:id" element={<CatalogSubCategory />} />
          <Route
            path="catalog/:id/products/:categoryId"
            element={<CatalogProduct />}
          />
          <Route
            path="catalog/:id/products/:categoryId/product/:productId"
            element={<ProductDetails />}
          />
          {/* <Route path='category/:id' element={<Product />} /> */}

          {/* <Route path='category_1/:id/:id' element={<ProductDetails />} /> */}
          <Route path="aboutus" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<Login />} />
          <Route path="adminpage" element={<AdminPage />}>
            <Route path="addingcategory" element={<AddingCategory />}>
              <Route path="mainlevel" element={<MainCategory />} />
              <Route path="level-1" element={<SubCategory />} />
            </Route>

            <Route path="addingproducts" element={<AddingProducts />} />
            <Route path="prodlisting" element={<ProdListing />} />
            <Route path="prodlisting/prodcreate" element={<ProdCreate />} />
            <Route path="prodlisting/prodedit/:empid" element={<ProdEdit />} />
            <Route
              path="prodlisting/prodedit/:empid/:sizeid"
              element={<SizeEdit />}
            />
            <Route
              path="prodlisting/prodcreate/proddetail/:empid"
              element={<ProdDetail />}
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

// <Footer/>
// <Route path='prodlisting/prodcreate' element={<ProdCreate />} />
// <Route path='adminpage/prodcreate2' element={<ProdCreate2 />} />
// <Route path='prodlisting/proddetail/:empid' element={<ProdDetail />} />
// <Route path='prodlisting/prodedit/:empid' element={<ProdEdit />} />

// <Route path='/adminpage/addingproducts' element={<AddingProducts />} />
//  <Route path='/adminpage/addingcategory' element={<AddingCategory />} />
