import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../fetchapi'
import CategoryProduct from './categoryProduct'
const Category = ({id,name,onCategoryClick}) => {
  const [products,setProducts]=useState({errorMessage:'',data:[]})
  const {categoryId}=useParams();

  useEffect(()=>{
    const fetchData=async()=>{
        const responseObj=await getProducts(categoryId)
        setProducts(responseObj)
    }
    fetchData();
      },[categoryId]);
      const renderProducts=()=>{
        return products.data.map(p=>
     
          <CategoryProduct key={p.id} {...p}>{p.name}</CategoryProduct>
        )
      }
  return (
 
    <div>
<h1 align="center">Products</h1>
     {products.errorMessage && <div>Error: {products.errorMessage}</div>}
    
     {products && renderProducts()}
     </div>

  )
}

export default Category