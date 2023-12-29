import React from "react";
import "../Catalog/Category.css";
import { Link, Outlet } from "react-router-dom";

export const TabButtons = () => {
  return (
    <div>
      <div className="col-md-12">
            <Link className="btn btn-outline-secondary"  to="/adminpage/addingcategory/mainlevel">
              Основные категории
            </Link>&nbsp;
            <Link className="btn btn-outline-secondary" to="/adminpage/addingcategory/level-1">
              Категории уровен 1
            </Link>
      </div>
      <div className="col-md-12">
        <Outlet />
      </div>

    </div>
  );
};
