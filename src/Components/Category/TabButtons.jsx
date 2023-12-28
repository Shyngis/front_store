import React from "react";
import "../Catalog/Category.css";
import { Link, Outlet } from "react-router-dom";

export const TabButtons = () => {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-12">

          <ul className="admin-category">
            <li>
              <Link to="/adminpage/addingcategory/mainlevel">
                Основные категории{" "}
              </Link>
            </li>
            <li>
              <Link to="/adminpage/addingcategory/level-1">
                Категории уровен 1{" "}
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
      <div className="row">
        <Outlet />
      </div>
    </div>
  );
};
