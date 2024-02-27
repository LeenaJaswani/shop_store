import React,{useState,useContext} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown,faHome ,faShoppingCart  } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet,Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { formatNumber } from '../utils';
import Search from './Search';

const Layout = ({categories}) => {
  const [searchTerm, setSearchTerm] = useState("");
const {cartItems} = useContext(CartContext);


  const handleSearch = (searchValue) => {
     
      setSearchTerm(searchValue);
   
  };
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
    const renderCategories=()=>{
   
        return categories.data.map(c=>
          <li key={c.id}><Link to={`categories/${c.id}`}>{c.name}</Link></li>
        
          );
       
      }
  return (
   <>
    <header>
    <nav className='navbar'>
      
    <div className="logo">
   
   <div className="text">    <img  className="logo" src="./assets/logo.png" alt="" />
   </div>
 <div className="home">
 <Link className="link"to="/">
       
          Home</Link>
   </div>
   
 </div>
 
        
       
        <div className="dropdown" >
          <button className="dropbtn">Categories <FontAwesomeIcon icon={faCaretDown} /> </button>
          <div className="dropdown-content" >
          {categories.errorMessage && <div>{categories.errorMessage}</div>}
     <ul>
     {
      categories.data &&
     renderCategories()
     }
     </ul>
          </div>
        </div>
        <Search onSearch={handleSearch} />
  





<Link to="cart" className="item link">
<div className="group">
<div className="sub">{cartItems.length}</div>
<FontAwesomeIcon icon={faShoppingCart} />
  <div className="detail">
    Cart 
    <div className="sub"> {formatNumber(totalPrice)} </div>
  </div>
</div>
</Link>
    </nav>
   
    </header>
    <section>
     
      <main>
     {/* <Outlet/> */}
     <Outlet context={{ searchTerm }} />
      </main>
    </section>
    <footer >
     Shop Store <img  className="flogo" src="./assets/logo.png" alt="logo" />
   
    </footer>
   </>
  )
}

export default Layout