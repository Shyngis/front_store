  {records.map((categor) => {
                          
  if (categor.name === category) {
    return <input type="text" 
    // key={categor.id} 
    value={categor.id} 
    onChange={(y)=>setCategory_id(y.target.value)} />;
  } 
  return null;
})}





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
