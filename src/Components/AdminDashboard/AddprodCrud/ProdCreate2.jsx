import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../../Common/ddata';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ProdCreate2.css'

export const ProdCreate2 = () => {

  const [article,setArticle] = useState("");
  const [size,setSize] = useState("");
   const [productId, setproductId] = useState();

  const [productArticleAndSize, setProductArticleAndSize] = useState([]);

  
  const handleSubmit1 = (y) => {
    
    y.preventDefault();
    toast.success("Успешно добавлено !", {
      position: toast.POSITION.TOP_RIGHT,
    })

    // const firstArtSizeData = artSizeData[0] ||   {} ; 

    const productsi = {
     
    //  article: firstArtSizeData.article || "", // Use the article from the first element or an empty string
    // size: firstArtSizeData.size || "", 
    article,
    size,
    productId
    
     
    };
    // ... (other form data)


    fetch(URL + "/product/size", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productsi),
    })
      .then(function (response) {
        return response.json();
      })
      .then((product) => {
        setproductId(product.id);
        setProductArticleAndSize([...productArticleAndSize,product])
    
      })  

  //       const rowsss = [];
  // for (let i = 0; i < 10; i++) {
  //   // rowsss.push(<h1 key={i}></h1>);
  // }
  // console.log('rows', rowsss);
 
  // var rowsss = [];
  };


  

  return (
    <>
                  <div className='all'>       

        <div className="article_size">
            <label>Артикул и размер</label>
        </div>

          
            <div>
              <label>Артикул товара</label>
              <input 
                type="text" 
                value={article || ''}
                onChange={(y)=>setArticle(y.target.value)}
                required
              />  


              <label>Размер товара</label>
              <input
                type="number"
                value={size || ''}
                onChange={(y) => setSize(y.target.value)}
                required
              />

            </div>
           

            <ToastContainer />
            <button onClick={handleSubmit1}>Добавить</button>
            <Link to='/adminpage/prodlisting' className='btn btn-danger' >Назад</Link>
            {productArticleAndSize.length > 0 && (
        <table>
        <thead>
              <tr>
                <td>Артикул</td>
                <td>Размер</td>
              </tr>
        </thead>
          <tbody>
            {productArticleAndSize.map((product) => (
              <tr key={product.id}>
                <td>{product.article}</td>
                <td>{product.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>       
    </>
  )
}
