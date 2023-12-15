import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export const ProdEdit = () => {
   const{empid} = useParams();

  // const [empdata, empdatachange] = useState({});
  
  useEffect(()=>{
    fetch(URL + "/category/parent/2" + empid)
      .then((res)=>{
        return res.json();
      })
      .then((resp) =>{
        idchange(resp.id);
        namechange(resp.name)
        emailchange(resp.email)
        phonechange(resp.phone)
        activechange(resp.isactive)
      })
      .catch((err) =>{
        console.log(err.message);
      })

  }, [])

  const[id,idchange] = useState("");
  const[name,namechange] = useState("");
  const[email,emailchange] = useState("");
  const[phone,phonechange] = useState("");
  const[isactive,activechange] = useState(true);
  const [validation,valchange] = useState(false)

  const navigate = useNavigate();

  const handlesubmit =(e)=>{
    e.preventDefault();

    // console.log({id,name,email,phone,active});


    const empdata = {id,name,email,phone,isactive};
    

    fetch(URL + "/category/parent/2"+empid,{
      method: "PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    })
    .then((res)=>{
        alert("Saved Succesfully")
        navigate('/')
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
                <h2>Employee Edit</h2>
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
                      <label htmlFor="">Email</label>
                      <input value={email} onChange={e=>emailchange(e.target.value)} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12">
                  <div className="form-group">
                      <label htmlFor="">Phone</label>
                      <input value={phone} onChange={e=>phonechange(e.target.value)} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12">
                  <div className="form-check">
                    <input checked={isactive} onChange={e=>activechange(e.target.checked)} type='checkbox' className='form-check-input' />
                      <label className='form-check-label' htmlFor="">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className='btn btn-success' type='submit'>Save</button>
                      <Link to='/' className='btn btn-danger' >Back</Link>
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
