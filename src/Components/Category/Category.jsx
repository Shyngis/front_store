import React, { useEffect, useState } from 'react'
import './Category.css'
import { Link } from 'react-router-dom';
// import {categor} from'./Tocheck';


export const Category = () => {
  const[records,setRecords] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/categor")
    .then((response) =>response.json())
    .then((records)=>setRecords(records))
    .catch((err) =>console.log(err));
  }, []);

  return (
    <section className='cat'>
    {records.map((cat_prod)=>(
        <Link to={`/category/${cat_prod.nazv}`}>
        <div className="cards_cat">
      <div className="image_box_cat">
        <img src={cat_prod.image_cat} alt="" />
      </div>
      <div className="details_cat">
        <p>{cat_prod.nazv}</p>
        
      </div>
    </div>
    </Link>
  ))}
    </section>
  )
}
