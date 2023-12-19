  import React, { useEffect, useState } from 'react'
  import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
  import './ProdListing.css'
import ReactPlayer from 'react-player';
import { URL } from '../../Common/ddata';


  export const ProdListing = () => {
    const[empdata,empdatachange] = useState()

    const navigate = useNavigate();

    const LoadDetail=(id)=>{
      navigate("/adminpage/prodlisting/proddetail/"+id)
     
    }
    const LoadEdit=(id)=>{
      navigate("/adminpage/prodlisting/prodedit/"+id)
    }
    const Removefunction=(id)=>{
      if(window.confirm("Do you want to remove?")){
        fetch(URL + "/category/parent/2" +id,{
        method: "DELETE",
        // headers:{"content-type":"application/json"},
        // body:JSON.stringify(empdata)
      })  
      .then((res)=>{
          alert("Removed Succesfully!")
          window.location.reload();
      }).catch((err) =>{
          console.log(err.message);
      })

      }
    }


    useEffect(()=>{
        fetch(URL + "/product/page?size=20")
        .then((res)=>{
          return res.json();
        })
        .then((resp) =>{
          empdatachange(resp.products);
          
        })
        .catch((err) =>{
          console.log(err.message);
        })

    },[])


 
    const[productsize,setProductsize] = useState([])
    const [idpr,setIdpr] = useState()
    useEffect(()=>{
       {
      fetch(URL+"/product/size/"+idpr)
        .then((res)=>{
          return res.json();
        })
        .then((resp) =>{
        setProductsize(resp);
        console.log("seen");
        console.log(idpr);

        })
        .catch((err) =>{
          console.log(err.message);
        })
}
    }, [])

    return (
      <>
      <div className="container">
        <div className="card">
          <div className="card-title">
          <h2>Продукты</h2>

        
          </div>
          <div className="card-body">
            <div className='divbtn'>
                <Link to='prodcreate' className='btn btn-success' >Добавить новый продукт (+)</Link>
                </div>
                
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
              <tr>
              <td>ID</td>
              <td>Категория</td>
              <td>Название</td>
              <td>Описание</td>
              <td>Новинка</td>            
              <td>Action</td>
              </tr>
              </thead>
              <tbody>
              
              
              { empdata &&
                empdata.map((item)=>(
                <tr key={item.id}>
                
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{(item.isNew) ? "ДА" : "НЕТ"}</td>
                <td>
                  <a onClick={()=>{LoadEdit(item.id)}} className='btn btn-success'>Редакт.</a>
                  <a onClick={()=>{Removefunction(item.id)}} className='btn btn-danger'>Удалить</a>
                  <a onClick={()=>{LoadDetail(item.id)}} className='btn btn-primary'>Подр.</a>
                </td>
                </tr>
                
              ))}
              
              </tbody>
                
            </table>
            <Outlet />
          </div>
        </div>

      </div>
      </>
    )
  }
