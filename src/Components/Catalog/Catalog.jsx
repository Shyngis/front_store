import React, { useEffect, useState } from 'react'
// import ''
import { Link, Outlet } from 'react-router-dom';
// import {categor} from'./Tocheck';
import { URL } from '../Common/ddata';

export const Catalog = () => {


  const [mainCategories, setMainCategories] = useState([]);
  useEffect(() => {
    fetch(URL + "/category/parent/1")
      .then((response) => response.json())
      .then((mainCategories) => {
        setMainCategories(mainCategories);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section className='cat'>
        {mainCategories.map((category) => (
          <Link to={`/catalog/first-level/${category.id}`}>
            <div className="cards_cat">
              <div className="image_box_cat">
                {/* <img src={category.image_cat} alt="" /> */}
                <img src="https://valtec.ru/image/groups/1.jpg" alt="" />
              </div>
              <div className="details_cat">
                <p>{category.name}</p>

              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}
