import React, { useEffect, useState } from 'react';
import { URL } from '../../Common/ddata';
import { TabButtons } from '../../Category/TabButtons';

export const CategoryByMainLevel = () => {

  const [name, setNazv_cat] = useState("");
  const [image_cat, setImage_cat] = useState();

  const handleSubmit = (y) => {
    y.preventDefault();
    const category = {
      name
    };

    fetch(URL + "/category", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(category),
    })
    .then((data) => { return data.json() })
    .then((result) => { 
      alert(result) 
    });

  }
  return (
    <>
    <br />
      <div className='category'>

        <form onSubmit={handleSubmit}>
          <h2>Добавление Категории</h2>
          <label>Название Категории</label>
          <input type="text"
            value={name}
            onChange={(y) => setNazv_cat(y.target.value)}
            required />
          <label>Загрузить фото </label>
          <input type="file"
            value={image_cat}
            multiple
            onChange={(y) => setImage_cat(y.target.value)}
          />
          <button className="adding_pr">Добавить category</button>
        </form>

        <div className='why'>

        </div>
      </div>
    </>
  )
}