  {records.map((categor) => {
                          
  if (categor.name === category) {
    return <input type="text" 
    // key={categor.id} 
    value={categor.id} 
    onChange={(y)=>setCategory_id(y.target.value)} />;
  } 
  return null;
})}



  const handleAdd = () => {
    setArtSizeData([...artSizeData, { article: "", size: "" }]);
    
  };

//  articul and size

const handleDelete = (i) => {
    const updatedData = [...artSizeData];
    updatedData.splice(i, 1);
    setArtSizeData(updatedData);
  };


 // const handleChange = (y) => {
  //   // const updatedData = [...artSizeData];
  //   // updatedData[i][field] = value;
  //   // setArtSizeData(updatedData);
    


  // };


 <div className="article_size">
            <label>Артикул и размер</label>
            <button type="button" className="adding_pr" onClick={handleAdd}>
              Добавить
            </button>
          </div>

          {artSizeData.map((data, i) => (
            <div key={i}>
              <label>Артикул товара</label>
              <input 
                type="text"
                value={data.article}
                onChange={(y) => handleChange(i, "article", y.target.value)}
                required
              />  


              <label>Размер товара</label>
              <input
                type="number"
                value={data.size}
                onChange={(y) => handleChange(i, "size", y.target.value)}
                required
              />

              <button type="button" onClick={() => handleDelete(i)}>
                Удалить
              </button>
            </div>
          ))}

              <button onClick={handleSubmit1}>Upload1art</button>



              <div key={product.id}>
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
        {product.map((product)=>(
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.article}</td>
            <td>{product.size}</td>
           
             <td>
                <button>Edit</button>
                <button>Remove</button>
                <button>Details</button>
              </td>
          </tr>
       ))} 
          




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











     {imgRealDisplay.map((product) => {
                      return (
                        <div className="img-thumbnail"><p>
                        {product.filename}
                        </p>
                          <img
                           src={imgURL+"/images/thumbnail-"+product.filename} alt="Filepath"
                             className="img-thumbnail"
                           />
                         
                        </div>
                        
                      )
                    })}