import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { URL, imgPrefixURL } from "../Common/ddata";
import { Button, Card } from "react-bootstrap";
import CategoryService from "../services/CategoryService";
import "./Catalog.css";

export const CatalogFilter = () => {
  const [valtec, setValtec] = useState('active');
  const [santec, setSantec] = useState('');

  // useEffect(() => {

  //   CategoryService.findByParentAndImageId(1).then(result => {
  //     setMainCategories(result);
  //   });
  // }, []);

  function toggle(type) {
    if (type === 'valtec') {
      if (valtec === 'active') {
        setValtec('');
      } else {
        setValtec('active');
      }
    };
    if (type === 'santec') {

      if (santec === 'active') {
        setSantec('');
      } else {
        setSantec('active')
      }
    };
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="product-filter">
            {/* Фильтр:&nbsp; */}
            <button className={"btn btn-outline-danger " + valtec} onClick={() => toggle('valtec')} >Valtec</button>&nbsp;
            <button className={"btn btn-outline-danger " + santec} onClick={() => toggle('santec')}>Santec</button>
          </div>
        </div>
      </div>
    </>
  );
};
