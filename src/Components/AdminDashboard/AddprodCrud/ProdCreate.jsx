import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../../Common/ddata';
import "./ProdCreate.css";



export const ProdCreate = () => {
  const [category, setCategoria] = useState();
  const [name, setName_pr] = useState("");
  const [description, setDesc_pr] = useState("");
  const [video, setVideo_pr] = useState("");
  const [isNew, setCheckbox_pr] = useState(false);

  const [productId, setproductId] = useState();
  const [validation,valchange] = useState(false)

  const navigate = useNavigate();

  const handlesubmit =(e)=>{
    e.preventDefault();
    // console.log({id,name,email,phone,active});


    const products = {
      name,
      description,
      // image,
      // artSizeData,
      // file_pr1,
      
      video,
      isNew,
      category,
      productId,
    };
    

    fetch(URL + "/product",{
      method: "POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(products)
    })
    .then((product)=>{
        alert("Saved Succesfully")
        navigate('prodcreate2')
        console.log('container.id==product.id==', product.id);
        setproductId(product.id);
    }).catch((err) =>{
        console.log(err.message);
    })

  }

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(URL + "/category/parent/2")
      .then((response) => response.json())
      .then((categor) => setRecords(categor))
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="container">
    
        <form className="form-container" onSubmit={handlesubmit}>
         <div>
            <label htmlFor="cars">Выберите категорию:</label>
             
            <select  value={category} onChange={(y)=>setCategoria(y.target.value)}>
                        {records.map((categor)=>(         
              <option 
              
              name="option"
              key={categor.id} 
              value={categor.id || ''}>
              {categor.name} 
              </option>
              
              ))}  
              </select>

          </div>

          <label>Название товара:</label>

          <input
            type="hidden"
            value={productId || ''}
            name="productId"
            onChange={(y) => setproductId(y.target.value)}
            
          />

          <input
            type="text"
            value={name || ''}
            onChange={(y) => setName_pr(y.target.value)}
            required
          />
          {/* ... (other input fields) */}
          <label>Описание:</label>
          <textarea
            required
            name="description"
            value={description || ''}
            onChange={(y) => setDesc_pr(y.target.value)}
          />

           <div className="checkbox">
            <label>Новинка:</label>
            <input
              type="checkbox"
              checked={isNew || ''}
              onChange={(event)=>setCheckbox_pr(event.target.checked)}
            />
          </div>
          
          <label>Ссылка для видео:</label>
          <input type="url" onChange={(y) => setVideo_pr(y.target.value)} />

                  
                  <div className="col-lg-12">
                    <div className="submit-buttons">
                          
                      <button className="submit-button save-button" type='submit'>Сохранить</button>
                      <Link to='/adminpage/prodlisting' className="submit-button back-button" >Назад</Link>
                    </div>
                  </div>
        </form>
      
    </div>
  )
}

