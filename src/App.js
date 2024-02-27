import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';
import Category from './Components/Category';
import ProductDetail from './Components/ProductDetail';
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  createRoutesFromElements ,
  Route,

} from "react-router-dom";

import Cart from './Components/Cart';
import Checkout from './Components/Checkout';

import Layout from './Components/Layout';
import { getCategories,getProducts } from './fetchapi'
import Home from './Components/Home';

import SearchResults from './Components/SearchResults';

function App() {
  const [categories,setCategories]=useState({errorMessage:'',data:[]})
  const [products,setProducts]=useState({errorMessage:'',data:[]})
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (term) => {
  //   setSearchTerm(term);
    
  // };
  useEffect(()=>{
    const fetchData=async()=>{
      const responseObj=await getCategories()
      // await fetcher("/categories")
     
      setCategories(responseObj)
    }
   
fetchData();

  },[])


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="/" element={<Layout categories={categories}/>}>
      
      <Route index element={<Home/>}/>
      <Route path="categories/:categoryId" element={<Category/>}/>
      <Route path="products/:productId" element={<ProductDetail/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="checkout" element={<Checkout/>}/>
  
      <Route path="search" element={<SearchResults/> } />
   </Route>
   </Route>

));

  return (

<>
<RouterProvider router={router} /> 
    </>
  );
}

export default App;
