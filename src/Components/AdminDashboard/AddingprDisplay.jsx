import React, { useEffect, useState } from 'react'
import { URL } from '../Common/ddata';

export const AddingprDisplay = () => {
      const [records, setRecords] = useState([]);

     useEffect(() => {
    fetch(URL + "/product/id/170")
      .then((response) => response.json())
      .then((all) => setRecords(all))
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
   <div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Decription</td>
             <td>Action</td>
          </tr>
        </thead>
        <tbody>
        
          <tr key={records.id}>
            <td>{records.id}</td>
            <td>{records.name}</td>
            <td>{records.description}</td>
            
             <td>
                <button>Edit</button>
                <button>Remove</button>
                <button>Details</button>
              </td>
          </tr>
       
          
        </tbody>

      </table>
   </div> 
    </>
    
  )
}
