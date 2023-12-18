import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { URL } from '../../Common/ddata';

export const SizeEdit = () => {
  const{empid} =useParams();

    const[id,idchange] = useState("");
   const [article,setArticle] = useState("");
  const [size,setSize] = useState("");


  // const handlesubmit1=(e)=>{
  //   e.preventDefault();

  //   // console.log({id,name,email,phone,active});


  //   const empdata = {id,article,size};
    

  //   fetch(URL + "/product/size"+sizeid,{
  //     method: "PUT",
  //     headers:{"content-type":"application/json"},
  //     body:JSON.stringify(empdata)
  //   })
  //   .then((res)=>{
  //       alert("Saved Succesfully")
        
  //       // navigate('/adminpage/prodlisting')
  //   }).catch((err) =>{
  //       console.log(err.message);
  //   })

  // }

  const[productsize,setProductsize] = useState([])

  useEffect(()=>{
    fetch(URL + "/product/size/"+empid)
      .then((res)=>{
        return res.json();
      })
      .then((resp) =>{
       setProductsize(resp);
       console.log("seen");

      })
      .catch((err) =>{
        console.log(err.message);
      })

  }, [])

  return (
    <>
    
    
    <div>
    <label>Артикул товара</label>
              <input 
                type="text" 
                value={productsize.article}
                onChange={(y)=>setArticle(y.target.value)}
                required
              />  


              <label>Размер товара</label>
              <input
                type="number"
                value={productsize.size}
                onChange={(y) => setSize(y.target.value)}
                required
              />
              </div>
              
              </>
  )
}
