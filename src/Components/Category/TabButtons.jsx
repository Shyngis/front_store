import React from "react";
import "../Catalog/Category.css";
import { Link, Outlet } from "react-router-dom";

export const TabButtons = () => {
  return (
    <div className="container text-center">
      <ul className="admin-category">
        <div className="row">
          <div className="col-md-4">
            <li>
              <Link to="/adminpage/addingcategory/mainlevel">
                Основные категории{" "}
              </Link>
            </li>
          </div>
          <div className="col-md-4">
            <li>
              <Link to="/adminpage/addingcategory/level-1">
                Категории уровен 1{" "}
              </Link>
            </li>
          </div>
        </div>
      </ul>
      <div className="row">
        <Outlet />
      </div>
    </div>
  );
};
