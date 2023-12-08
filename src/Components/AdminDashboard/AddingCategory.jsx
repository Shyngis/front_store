import React, { useEffect, useState } from 'react';
import './AddingCategory.css'
import { CatListing } from './CrudCategory/CatListing';

export const AddingCategory = () => {
const [nazv, setNazv_cat] = useState("");
const [image_cat,setImage_cat] = useState();


  const handleSubmit = (y) =>{
    y.preventDefault();
  
    const category ={
    category,
    image_cat,

  };

  fetch("http://161.97.144.45:8181/product" ,{
    method:"POST",
    headers: {"Content-type":"application/json"},
    body: JSON.stringify(category),
  }).then(()=>{
    console.log("new category added");
  });

  }
  return (
    <>
    <CatListing />
    <div className='category'>
    <form onSubmit={handleSubmit}>
    <h2>Добавление Категории</h2>
        <label>Название Категории</label>
        <input type="text"
        value={nazv}
        onChange={(y)=>setNazv_cat(y.target.value)}
        required />
        <label>Загрузить фото </label>
        <input type="file"
         value={image_cat}
         multiple
         onChange={(y)=>setImage_cat(y.target.value)}
        />
        <button className="adding_pr">Добавить category</button>
        </form>
        
        <div className='why'>
            
        </div>
        </div>
        </>
   )
}