import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { formatNumber } from "../utils";

const Cart = ({images}) => {
    const [cartItems, setCartItems] = useState([]);
    const [orderId, setOrderId] = useState(""); 
    const navigate = useNavigate();
    const { getCartItems, removeProduct, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
    
    useEffect(() => {
        const items = getCartItems();
        if (items) {
            setCartItems(items);
            generateRandomOrderId();
        }
    }, [getCartItems]);
    const generateRandomOrderId = () => {
        const newOrderId = `order-${Math.random().toString(36).substr(2, 9)}`; // Generates a random string
        setOrderId(newOrderId);
    };
    const getImageSrc = (image) => {
        if (image.startsWith('http://') || image.startsWith('https://')) {
          return image;
        } else {
          return `../assets/${image}`;
        }
      };

    const renderCart = () => {
        if (cartItems.length > 0) {
            return cartItems.map((p) => (
                <Card key={p.id}>
                    <CardHeader>
                        <Link to={`/products/${p.id}`}>{p.name}</Link>
                    </CardHeader>
                    {/* Uncomment and use if images are provided */}
                    <ProductImageContainer>
                        {/* {p.images?.map((image, index) => ( */}
                            {/* // <ProductImage key={p.index} src={getImageSrc(image)} alt={`${p.name} - ${index}`} /> */}
                            {p.images?.[0] && (
                                <ProductImage className="cardImage" src={getImageSrc(p.images[0])} alt={p.name} />
                              )}

                        {/* ))} */}
                    </ProductImageContainer>
                   
                    <CardBody>
                        <QuantityControls>
                            <CartIconButton onClick={() => setCartItems(decreaseQuantity({id: p.id}))}>
                                <FontAwesomeIcon icon={faMinus} />
                            </CartIconButton>
                            {p.quantity}
                            <CartIconButton onClick={() => setCartItems(increaseQuantity({id: p.id}))}>
                                <FontAwesomeIcon icon={faPlus} />
                            </CartIconButton>
                            <Price>{formatNumber(p.price)}</Price>
                        <RemoveButton onClick={() => setCartItems(removeProduct({ id: p.id }))}>
                            <FontAwesomeIcon icon={faTrash} />
                        </RemoveButton>
                        </QuantityControls>
                        <CartButton id={orderId} onClick={(item) => navigate("/checkout?"+orderId)}>Order</CartButton>
                    </CardBody>
                </Card>
            ));
        } else {
            return <EmptyCart>The Cart is currently empty</EmptyCart>;
        }
    };

   
    //     const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    //     return total;
    // };

    const renderTotal = () => {
        const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return total;
    };

    return (
        <CartContainer>
            <CartHeader>Shopping Cart</CartHeader>
            <Content>
                {renderCart()}
            </Content>
            <CartFooter>
                <CartButton onClick={() => setCartItems(clearCart())}>Clear Cart</CartButton>
                <Total>Total: {formatNumber(renderTotal())}</Total>
                <CartButton  id={orderId} onClick={() => navigate("/checkout?"+orderId)}>Order All</CartButton>
            </CartFooter>
        </CartContainer>
    );
};
export default Cart;


const CartHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr;
    border-bottom: 1px solid #ddd;
`;


const CartButton = styled.button`
  border-radius: 8px;
  height: 40px;
  width:80px;
  border:none;
  margin-top:20px;
  background-color:#240046;
  color:white;
  text-align:center;
  &:hover {
    background-color: #5a189a; /* Slightly lighter shade */
    /* Alternatively, for a more dynamic effect, you could use:
    filter: brightness(1.1); */
    cursor:pointer;
}
`;

const CartIconButton = styled.button`
  border-radius: 8px;
  height: 20px;
  width:30px;
  border:none;
  
  background-color:#240046;
  color:white;
  text-align:center;
  &:hover {
    background-color: #5a189a; /* Slightly lighter shade */
    /* Alternatively, for a more dynamic effect, you could use:
    filter: brightness(1.1); */
    cursor:pointer;
}
`;
const ProductImageContainer = styled.div`
    padding: 10px;
    width: 60%;
//   border:10px solid;
   
`;

const ProductImage = styled.img`
    width: 50px;
    height: 50px;
    background-color: red;

`;
const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    color: #240046;
    width:100%;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const CardHeader = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const CardBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const QuantityControls = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Price = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

const RemoveButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;



const Total = styled.div`
    font-size: 20px;
    font-weight: bold;
    align-self: end;
`;

const EmptyCart = styled.div`
    text-align: center;
`;

const CartFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto; /* Pushes the footer to the bottom */
`;
