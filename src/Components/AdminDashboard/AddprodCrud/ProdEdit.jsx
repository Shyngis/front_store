import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { URL } from '../../Common/ddata';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProdEdit = () => {
   const{empid} = useParams();

  // const [empdata, empdatachange] = useState({});
  
  useEffect(()=>{
    fetch(URL + "/product/id/"+empid)
      .then((res)=>{
        return res.json();
      })
      .then((resp) =>{
        idchange(resp.id);
        categorychange(resp.category)
        namechange(resp.name)
        descriptionchange(resp.description)
        isNewchange(resp.isNew);
        setproduct(resp.id);
        console.log("see ");
      })
      .catch((err) =>{
        console.log(err.message);
      })

  }, [])

  const[id,idchange] = useState("");
  const[name,namechange] = useState("");
  const[category,categorychange] = useState("");
  const[description,descriptionchange] = useState("");
  const[isNew,isNewchange] = useState(true);
  const[video,setVideo_pr] =useState("")
  const [validation,valchange] = useState(false)

  const navigate = useNavigate();

  const handlesubmit =(e)=>{
    e.preventDefault();

    const empdata = {id,name,category,description,isNew,video};
    
    fetch(URL + "/product",{
      method: "PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    })
    .then((res)=>{
        alert("Saved Succesfully")
        
        navigate('/adminpage/prodlisting')
    }).catch((err) =>{
        console.log(err.message);
    })

  }

  const [article,setArticle] = useState("");
  const [size,setSize] = useState("");
   const [productId, setproductId] = useState();
   const [product, setproduct] = useState();
   

  const [productArticleAndSize, setProductArticleAndSize] = useState([]);

  const handleSubmit1 = (y) => {
    
    y.preventDefault();
    toast.success("Успешно добавлено !", {
      position: toast.POSITION.TOP_RIGHT,
    })

    const productsi = {
    article,
    size,
    product
    };


    fetch(URL + "/product/size", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productsi),
    })
      .then(function (response) {
        return response.json();
      })
      .then((product) => {
        // setproductId(product.id);
        setProductArticleAndSize([...productArticleAndSize,product])
    
      })  

  };

  // const[productsize,setProductsize] = useState([])

  useEffect(()=>{
    fetch(URL + "/product/size/"+empid)
      .then((res)=>{
        return res.json();
      })
      .then((resp) =>{
      //  setProductsize(resp);
      setProductArticleAndSize(resp)
       console.log("seen");

      })
      .catch((err) =>{
        console.log(err.message);
      })

  }, [])


  const LoadEdit=(id)=>{
    navigate("/adminpage/prodlisting/prodedit/"+empid+"/"+id);
    console.log("loadedit");
    
  }

  const removeArticleAndSize = (id) => {
  const newProductArticleAndSize = productArticleAndSize.map((paz) => {
    if (paz === id) {
      return {...paz, isRemoved: true};
    }
    return paz;
  });

  setProductArticleAndSize(newProductArticleAndSize);
};
  const Removefunction=(product)=>{
    
       fetch(URL + "/product/size/" + product.id,{
      method: "DELETE",
      // headers:{"content-type":"application/json"},
      // body:JSON.stringify(empdata)
    })  
    .then((res)=>{
        product.isRemoved = true;
        removeArticleAndSize(product.id);
        console.log(productArticleAndSize);
        toast.error("Успешно удалено !", {
      position: toast.POSITION.TOP_RIGHT,
    })
        
    }).catch((err) =>{
        console.log(err.message);
    })

    
  }
  const [files, setFiles] = useState();

   const handleOzgert = (y) => {
    setFiles(y.target.files);
    // setPhoto_pr(y.target.value);
    // setPhoto_pr(y.target.image);
  }


  function handleUpload() {
    for (let i = 0; i < files.length; i++) {
      const container1 = new FormData();
      container1.append("container", productId)
      container1.append(`file`, files[i])
      Send(container1);
      console.log('container1',container1);
    }     
  }
  function Send(data) {
    fetch(URL + '/upload/image', {
      method: 'POST',
      // headers: { "Content-type": "multipart/form-data" },
      body: data
    }).then(res => res.json()).
      then(data => console.log(data)).
      catch(err => console.log(err));
  }


  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(URL + "/category/parent/2")
      .then((response) => response.json())
      .then((categor) => setRecords(categor))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
    <div className='row'>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card" style={{"textAlign":"left"}}>
            <div className="card-title">
                <h2>Редактирование</h2>
            </div>
              <div className="card-body">
                <div className="row">
                <div className="col-lg-12">
                <div className="form-group">
                      <label htmlFor="">ID</label>
                      <input value={id} disabled="disabled" className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12">
                  <div className="form-group">
                      <label htmlFor="">Name</label>
                      <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className='form-control' />
                     {name.length===0 && validation && <span className='text-danger'>Enter the name</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                  <div className="form-group">
                      <label htmlFor="">Category</label>
                      <input type='hidden' value={category} onChange={e=>categorychange(e.target.value)} className='form-control' />


                       <select  value={category} onChange={(e)=>categorychange(e.target.value)}>
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
                  </div>
                  <div className="col-lg-12">
                  <div className="form-group">
                      <label htmlFor="">Description</label>
                      <input value={description} onChange={e=>descriptionchange(e.target.value)} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12">
                  <div className="form-check">
                    <input checked={isNew} onChange={e=>isNewchange(e.target.checked)} type='checkbox' className='form-check-input' />
                      <label className='form-check-label' htmlFor="">Новинка</label>
                    </div>
                  </div>
                  <label>Ссылка для видео:</label>
          <input type="url" value={video} onChange={e => setVideo_pr(e.target.value)} />

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
            
                
      <table>
        <thead>
              <tr>
                <td>Артикул</td>
                <td>Размер</td>
                <td>Action</td>
              </tr>
        </thead>
          <tbody>
          
            {productArticleAndSize.map((product) => {
             
                
              return (
                 product.isRemoved == false &&

             <tr key={product.id} >
                <td>{product.article}</td>
                <td>{product.size}</td>
                <td>
                <a onClick={()=>{LoadEdit(product.id)}} className='btn btn-success'>Редакт.</a>
                <a onClick={()=>{Removefunction(product)}} className='btn btn-danger'>Удалить</a>
                
                
              </td>
              </tr>
                
              )
             })}
          </tbody>
        </table>
   

    </div> 

              <label>Загрузить фото:</label>
          <input
            type="file"
            name="file"
            multiple
            // value={files}
            onChange={handleOzgert}
          />
              <label>Загрузить файлы:</label>
          <input
            type="file"
            name="file"
            multiple
            // value={files}
            onChange={handleOzgert}
           
          />

          <button onClick={handleUpload}>Загрузить</button>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className='btn btn-success' type='submit'>Сохранить</button>
                      <Link to='/adminpage/prodlisting' className='btn btn-danger' >Назад</Link>
                    </div>
                  </div>
                </div>
              </div>
          </div>
               

        </form>
      </div>
    </div>
    </div>
  )
}
