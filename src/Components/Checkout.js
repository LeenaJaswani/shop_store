import React, { useState,useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    name: '',
    shippingAddress: '',
    billingAddress: '',
    touched: {
      email: false,
      password: false,
      shippingAddress: false,
      billingAddress: false,
      phoneNumber:false
  },
  });
  const errors = {
    name: formData.name.length === 0,
    email: formData.email.length === 0,
    phoneNumber: formData.phoneNumber.length === 0 || formData.phoneNumber.length <10 ,
    shippingAddress: formData.shippingAddress.length === 0,
    billingAddress: formData.billingAddress.length === 0,
};
const disabled = Object.keys(errors).some((x) => errors[x]);
const handleBlur = (ev) => {
  const { name } = ev.target;
  console.log(`Field blurred: ${name}`);
  setFormData((prevState) => {
    return {
      ...prevState,
      touched: { ...prevState.touched, [name]: true },
    };
  });
};

const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const navigate = useNavigate();
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (showConfirmationMessage) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [showConfirmationMessage, navigate]);

  const handleConfirmOrder = () => {
   
    setShowConfirmationMessage(true);

   
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressCopy = (e) => {
   
    if (e.target.checked) {
      
      setFormData({ ...formData, billingAddress: formData.shippingAddress });
    } else {
      
      setFormData({ ...formData, billingAddress: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    if (disabled) {
      return;
    }
    setIsModalOpen(true);
   
  };
  const showError = (field) => {
    const hasError = errors[field] && formData.touched[field];
    console.log(`Field: ${field}, Error: ${errors[field]}, Touched: ${formData.touched[field]}, Show Error: ${hasError}`);
    return hasError;
  };
  


  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit}>
      <CheckoutInput
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          invalid={showError("name")}
                       
                        onBlur={handleBlur}
                        
        />
        <CheckoutInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          invalid={showError("email")}
          onBlur={handleBlur}
        
        />
        <CheckoutInput
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          invalid={showError("phoneNumber")}
          required
        />
        
        <CheckoutTextArea
          name="shippingAddress"
          placeholder="Shipping Address"
          value={formData.shippingAddress}
          invalid={showError("shippingAddress")}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br />
         <div>
          <CheckoutInput
            type="checkbox"
            id="copyAddress"
            onChange={handleAddressCopy}

          />
          
          <label htmlFor="copyAddress">Copy Shipping Address to Billing Address</label>
        </div>
        <CheckoutTextArea
          name="billingAddress"
          placeholder="Billing Address"
          value={formData.billingAddress}
          invalid={showError("billingAddress")}
          onChange={handleChange}
          onBlur={handleBlur}
        />
       
       <CancelButton onClick={() => navigate("/cart")}>
                    Cancel
                </CancelButton>

                <CheckoutButton disabled={disabled}   onClick={handleSubmit}>
                    Confirm Order
                </CheckoutButton>
      </form>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            {showConfirmationMessage ? (
              <>
                <h2>Order Confirmed!</h2>
                <p>Your order has been successfully placed. You will be redirected shortly.</p>
              </>
            ) : (
              <>
                <h2>Confirm Order</h2>
                <br />
                <p>Are you sure you want to confirm the order?</p>
                <CancelButton onClick={handleModalClose}>Cancel</CancelButton><br />
                <CheckoutButton onClick={handleConfirmOrder}>Confirm</CheckoutButton>
              </>
            )}
          </ModalContent>
        </Modal>
      )}


    </div>
  );
}

export default CheckoutPage;


const CheckoutInput = styled.input`
border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
&:focus {
  border-color: blue;
}
margin-bottom: 15px;
padding: 10px;

border-radius: 4px;
font-size: 16px;
`;


const CheckoutButton = styled.button`
    border-radius: 8px;
    height: 40px;
    grid-column: 3;
    color: ${props => props.disabled ? 'gray' : 'white'}; 
    background-color: ${props => props.disabled ? '#ccc' : '#5a189a'}; 
margin-top:20px;
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
   
`;

const CancelButton = styled.button`
    border-radius: 8px;
    height: 40px;
    grid-column: 1;
    background-color: brown;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  // margin-right: 10px;
  transition: background-color 0.3s ease;
  margin-top:20px;
    
`;
const CheckoutTextArea = styled.textarea`
  border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
  &:focus {
    border-color: blue;
  }
  padding: 10px;
  resize: vertical;
  height: 100px;
  font-size: 16px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
 
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  border-radius:10px;
  padding: 20px;
  
  border: 1px solid #888;
  width: 30%;
  text-align: center;
`;