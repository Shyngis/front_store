import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, } from "react-router-dom";
import "./AdminPage.css";

export const AdminpageHeader = () => {

  // const logout = (y) => {
  //   // y.preventDefault();
  //   localStorage.removeItem('santec_items');
  //   useNavigate("/adminPage");
  //   console.log('hello');
  // };
  const navigate = useNavigate();

  const logout = (y) => {
    // useEffect(function logoutw() {
      localStorage.removeItem('santec_items');
      navigate("/");
    // });
  }

  return (
    <div className="admin-panel">
      <div className="row">
        <div className="col-md-12">
          <Link className="btn btn-outline-primary" to="/adminpage/addingcategory">Категории</Link>
          &nbsp;
          <Link className="btn btn-outline-primary" to="/adminpage/prodlisting">Продукты</Link>
          &nbsp;
          <button className="btn btn-outline-primary" onClick={logout}>Выход</button>
        </div>
      </div>
      <br />
      <div className="row">
        <Outlet />
      </div>
    </div>
  );
};
