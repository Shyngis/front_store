import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

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
  const [validation,valchange] = useState(false)

  const navigate = useNavigate();

  const handlesubmit =(e)=>{
    e.preventDefault();

    // console.log({id,name,email,phone,active});


    const empdata = {id,name,category,description,isNew};
    

    fetch(URL + "/product/id/"+empid,{
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
                      <input value={category} onChange={e=>categorychange(e.target.value)} className='form-control' />
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
