import React,{useEffect, useState,useContext} from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../fetchapi'
import styled from "styled-components";
import { CartContext } from '../contexts/CartContext';
const ProductDetail = () => {
  const { addProduct } = useContext(CartContext);

    const {productId}=useParams()
   
    const [product,setProduct]=useState({errorMessage:'',data:{}})
  useEffect(()=>{
const fetchData=async()=>{
    const responseObj=await getProductById(productId)
    setProduct(responseObj)
}
fetchData();
  },[productId]);
  const createMarkup=()=>{
    return {__html:product.data?.description}
  }

  const getImageSrc = (image) => {
   
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    } else {
      
      return `../assets/${image}`;
    }
  };

    return (
    <div>
        
   <ProductName>
        <ProductInfoHeader>{product.data.name}</ProductInfoHeader>
    </ProductName>
   <ProductInfoArticle>
   
    <figure className='pdetail'>
<ProductImageContainer>
{product.data.images?.map((image, index) => (
            <ProductImage key={index} src={getImageSrc(image)} alt={`${product.data.name}`} />
          ))}
</ProductImageContainer>
   </figure>
   <aside>
    <ProductInfo>
<ProductInfoDescription dangerouslySetInnerHTML={createMarkup()}>
 
</ProductInfoDescription>

    </ProductInfo>

    <ProductInfoPrice>

<p><strong>&#8377;{product.data.price}</strong></p>
    </ProductInfoPrice>
    <ProductInfoAction>
  
  <ProductInfoActionButton onClick={() => addProduct({
          id: product.data.id, 
          name: product.data.name, 
          price: product.data.price
        })}>Add to Cart</ProductInfoActionButton>
 </ProductInfoAction>
   </aside>
  
   </ProductInfoArticle>
    
    </div>
   
  )
}

export default ProductDetail



const ProductInfoArticle = styled.article`
  display:flex;
  justify-content:space-around;
  align-tems:center;
  text-align:center
  
`;

const ProductInfoDescription = styled.div`
    display:flex;
    justify-content:center;
    text-align:center;
    margin-top:80px;
`;

const ProductName = styled.div`
    grid-column: 1 / span 3;
    color: darkslategray;
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
`;

const ProductImageContainer = styled.div`
    padding: 10px;
 
`;

const ProductImage = styled.img`
width: 20rem;
height: 8rem;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoHeader = styled.h3`
    color: #240046;
    font-size: 1em;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
`;



const ProductInfoAction = styled.div`
    display: flex;
   justify-content:center;
   

`;

const ProductInfoActionButton = styled.button`
    width: 160px;
    height: 40px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: #240046;
    border: solid 1px slategrey;
    font-weight: bold;
    color:white;
    &:hover {
      background-color: #5a189a; /* Slightly lighter shade */
      /* Alternatively, for a more dynamic effect, you could use:
      filter: brightness(1.1); */
      cursor:pointer;
  }
`;

const ProductInfoPrice = styled.div`
    color: #240046;
    font-size: 2.5em;
    font-weight: bold;
    padding-top: 10px;
`;
