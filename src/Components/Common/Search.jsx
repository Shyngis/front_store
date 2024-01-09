import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
        <div className="img-thumbnail">
          <h5>{search.name} </h5>
          <p>{search.description}</p>
          <img
            src={imgPrefixURL + "/" + search.name}
            alt="Filepath"
            className="img-thumbnail"
          />
        </div>
      ))}
    </>
  );
};
