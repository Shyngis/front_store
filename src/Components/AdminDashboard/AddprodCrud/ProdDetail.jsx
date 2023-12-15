import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
export const ProdDetail = () => {
   const{empid} = useParams();

  const [empdata, empdatachange] = useState({});
  
  useEffect(()=>{
    fetch(URL + "/category/parent/2"+empid)
      .then((res)=>{
        return res.json();
      })
      .then((resp) =>{
        empdatachange(resp);
      })
      .catch((err) =>{
        console.log(err.message);
      })

  }, [])
  return (
    
    <div className="container">
      <div className="card">
        <div className="card-title">
        <h2>Employee Listing</h2>
        </div>
        <div className="card-body"></div>
    <div>
    {  empdata && <>
      <h2>The Employee name is:<b> {empdata.name}</b> ({empdata.id})</h2>
      <h3>Contact details</h3>
      <h5>Email is: {empdata.email}</h5>
      <h5>Phone is: {empdata.phone}</h5>
      <Link className='btn btn-danger' to='/'>Back to Listing</Link>
       </>

  }
    </div>
    </div>
    </div>
   
  )
}
