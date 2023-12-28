import React from "react";
import { Link, Outlet } from "react-router-dom";

export const AdminpageHeader = () => {
  return (
    <div>
      <div className="row">
        <ul className="admin-category">
          <div className="col-md-4 col-lg-2">
            <li>
              <Link to="/adminpage/addingcategory">Категории</Link>
            </li>
          </div>
          <div className="col-md-4 col-lg-2">
            <li>
              <Link to="/adminpage/prodlisting">Продукты</Link>
            </li>
          </div>
        </ul>
      </div>
      <div className="row">
        <Outlet />
      </div>
    </div>
  );
};
