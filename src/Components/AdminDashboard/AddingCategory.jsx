import React, { useState } from 'react';
import './AddingCategory.css'
import { AdminpageHeader } from './AdminpageHeader';

export const AddingCategory = () => {
const [nazv, setNazv_cat] = useState("");
const [image_cat,setImage_cat] = useState("");
  const handleSubmit = (y) =>{
    y.preventDefault();
  
    const category ={
    nazv,
    image_cat,

  };

  fetch("http://localhost:3000/categor" ,{
    method:"POST",
    headers: {"Content-type":"application/json"},
    body: JSON.stringify(category),
  }).then(()=>{
    console.log("new category added");
  });

  }
  return (
    
    <div className='category'>
      <h2>Добавление Категории</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
   
    
  )
}
