import React, { useState, useEffect } from 'react';
import CategoryProduct from './categoryProduct';
import { getCategories } from '../fetchapi';
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const images = ['slider1.jpg', 'slider2.jpg', 'slider3.jpg','slider4.jpg','slider5.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState({ errorMessage: '', data: [] });
  const navigate = useNavigate(); 
  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };


  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);   
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
        <div className="slider">
      <button onClick={goToPrevious} className="left-arrow">&#9664;</button>
      <img
        src={`${process.env.PUBLIC_URL}/assets/${images[currentIndex]}`}
        alt="Slideshow"
       
      />
      <button onClick={goToNext} className="right-arrow">&#9654;</button>
   
    </div>
    <div className="categories-container">
        {categories.data.map((category) => (
          <div key={category.id} className="category-card" onClick={() => handleCategoryClick(category.id)}>
            <img src={category.image} alt={category.name} /> 
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
