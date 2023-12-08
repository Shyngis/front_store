import React from 'react';
import { Link } from 'react-router-dom';


export const CatListing = () => {
  return (
    <>
    <div className="container">
      <div className="card">
        <div className="card-title">
        <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className='divbtn'>
              <Link to='employee/create' className='btn btn-success' >Add New (+)</Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
            <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Image</td>
           
            </tr>
            </thead>
            <tbody>
            
           
            
            </tbody>

          </table>
        </div>
      </div>

    </div>
    </>
  )
}
