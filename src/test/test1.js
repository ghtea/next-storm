const test = async () => {
  
  try {
    
      const response = await axios.get( `kkk`);
      
      
    
    console.log( "success")
  }
  catch (error) { console.log( "failed") return "return of fail" }
};


test();
