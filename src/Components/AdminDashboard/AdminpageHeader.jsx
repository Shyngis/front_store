import React from "react";
import { Link, Outlet } from "react-router-dom";

export const AdminpageHeader = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Link className="btn btn-outline-primary" to="/adminpage/addingcategory">Категории</Link>
          &nbsp;
          <Link className="btn btn-outline-primary" to="/adminpage/prodlisting">Продукты</Link>
        </div>
      </div>
      <br />
      <div className="row">
        <Outlet />
      </div>
    </div>
  );
};
