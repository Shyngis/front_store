import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams } from "react-router-dom";
// import {records} from '../Common/ddata'

export const CatalogProducts = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((records) => setRecords(records))
      .catch((err) => console.log(err));
  }, []);


 const params= useParams()

  return (
   

    <section className="cat_prod">
  
      {records.filter(r =>r.categoria===params.id).map((posts)=>(
        <Link to={`/catalogproducts/${posts.name}`}>
        <div className="cards">
      <div className="image_box">
        <img src={posts.image} alt="" />
      </div>
      <div className="details">
        <p>{posts.name}</p>
        <p>{posts.description}</p>
      </div>
    </div>
    </Link>
  ))}
 
    </section>
  );
};



// import React, { useEffect, useState } from "react";
// import "./CatalogProducts.css";
// import { Link, useParams } from "react-router-dom";

// export const CatalogProducts = () => {
//   const [records, setRecords] = useState([]);
//   const { name } = useParams();

//   useEffect(() => {
//     fetch("http://localhost:3000/posts")
//       .then((response) => response.json())
//       .then((records) => setRecords(records))
//       .catch((err) => console.log(err));
//   }, []);

//   const filteredRecords = records.filter((post) => post.name === name);

//   return (
//     <section className="cat_prod">
//       {filteredRecords.map((post) => (
//         <Link to={`/productdetails/${post.name}`} key={post.name}>
//           <div className="cards">
//             <div className="image_box">
//               <img src={post.image} alt="" />
//             </div>
//             <div className="details">
//               <p>{post.name}</p>
//               <p>{post.description}</p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </section>
//   );
// };
