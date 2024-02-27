import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { formatNumber } from '../utils';
const CategoryProduct = ({ id, name, images, description, price }) => {
  const getImageSrc = (image) => {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    } else {
      return `../assets/${image}`;
    }
  };
  const navigate = useNavigate();
  const { addProduct } = useContext(CartContext);

  return (
    <CardContainer>
      <Card>
        <CardImageContainer>
          {images?.[0] && (
            <CardImage className="cardImage" src={getImageSrc(images[0])} alt={name} />
          )}
        </CardImageContainer>
        <CardContent>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardPrice>{formatNumber(price)}</CardPrice>
          <CardActions>
            <ActionButton onClick={() => navigate(`/products/${id}`)}>
              View Product
            </ActionButton>
            <ActionButton onClick={() => addProduct({ id, name, price })}>
              Add to Cart
            </ActionButton>
          </CardActions>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default CategoryProduct;

// Styled Components
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  color:#240046;

 
`;

const Card = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background:transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
 
  margin: 0;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  
  margin: 0;
  margin-bottom: 15px;
`;

const CardPrice = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
`;

const CardActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  padding: 10px 15px;
  background-color: #240046;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #5a189a;
  }
`;
