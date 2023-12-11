  {records.map((categor) => {
                          
  if (categor.name === category) {
    return <input type="text" 
    // key={categor.id} 
    value={categor.id} 
    onChange={(y)=>setCategory_id(y.target.value)} />;
  } 
  return null;
})}