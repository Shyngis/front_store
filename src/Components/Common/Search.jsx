import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL, imgPrefixURL } from "./ddata";
import "./search.css";

export const Search = (e) => {
  const location = useLocation();
  console.log(location);

  // useEffect(() => {
  //   fetch(URL + "/product/search?query=" + "")
  //     .then((response) => response.json())
  //     .then((data1) => setData(data1));
  // }, []);

  // console.log(data);

  return (
    <>
      {location.state.data.map((search) => (
        <div className="img-thumbnail  d-flex ">
          <img
            src={imgPrefixURL + "/" + search.filename}
            alt="filepath"
            className="img-thumbnail img-fluid imgPr"
            onError={(e) => {
              e.target.src = "https://santehplast.kz/images/santec-bg.png";
            }}
          />
          <div
            className="ml-3 textPr"
            // style={{ maxHeight: "180px", overflow: "hidden" }}
          >
            <Link to={`product/${search.id}`}>
              <p>
                <b>{search.name} </b>
              </p>
            </Link>
            <p>{search.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};
