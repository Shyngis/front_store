import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL, imgPrefixURL } from "./ddata";

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
        <Link to={`product/${search.id}`}>
          <div className="img-thumbnail  d-flex ">
            <img
              src={imgPrefixURL + "/" + search.filename}
              alt="Filepath"
              className="img-thumbnail img-fluid"
              style={{ width: "120px", height: "180px" }}
            />
            <div
              className="ml-3"
              style={{ maxHeight: "180px", overflow: "hidden" }}
            >
              <p>
                <b>{search.name} </b>
              </p>
              <p>{search.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
