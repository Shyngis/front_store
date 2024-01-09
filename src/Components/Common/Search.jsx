import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { URL } from "./ddata";

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
      {location.state.data.map((sure) => (
        <div>{sure.name}</div>
      ))}
    </>
  );
};
