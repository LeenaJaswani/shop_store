// const baseUrl="http://localhost:3001"
const baseUrl="https://db-ack6.onrender.com"
export const fetcher=async (url)=>{
    let responseObj={errorMessage:"",data:[]}
    try{
   const response= await fetch(baseUrl+url)
   if(!response.ok){
    throw new Error("HTTP error "+response.status)
   }
    // .then(response=>response.json())
    // .then(data=>{
  
    // return data;
    const responseData=await response.json();
    responseObj.errorMessage=''
    responseObj.data=responseData
    // return responseData;
}
    catch(err){
responseObj.errorMessage=err.message
    }
     return responseObj;
    }
    
export const getCategories=()=>{
    return fetcher('/categories');
}
export const getAllProducts = async () => {
    try {
        const response = await fetcher('/products');
        if (response.ok) {
            return { data: response.data, errorMessage: '' };
        } else {
            return { data: [], errorMessage: 'Failed to fetch products' };
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return { data: [], errorMessage: 'An error occurred while fetching products' };
    }
};
export const getProducts=id=>{
    return fetcher('/products?category.id='+id);
}


export const getProductById=id=>{
    return fetcher('/products/'+id)
}

export const getProductsByQuery = async (query) => {
    
        let responseObj = { errorMessage: "", data: [] };
      
        try {
          // Fetch both products and categories
          const productsResponse = await fetch(baseUrl + '/products');
          const categoriesResponse = await fetch(baseUrl + '/categories');
      
        //   if (!productsResponse.ok || !categoriesResponse.ok) {
        //     throw new Error("HTTP error " + (productsResponse.ok ? categoriesResponse.status : productsResponse.status));
        //   }
      
          const products = await productsResponse.json();
          const categories = await categoriesResponse.json();
      
          const combinedData = products.map(product => {
            const category = categories.find(category => category.id === product.category.id);
            return { ...product, category };
          });
      
        
          const filteredData = combinedData.filter(product => {
            
            return product.name.toLowerCase().includes(query.toLowerCase()) ||
                   product.description.toLowerCase().includes(query.toLowerCase()) ||
                   product.category.name.toLowerCase().includes(query.toLowerCase());
          });
      
          responseObj.data = filteredData;
        } catch (err) {
        //   responseObj.errorMessage = err.message;
        }
      
        return responseObj;
      };
      