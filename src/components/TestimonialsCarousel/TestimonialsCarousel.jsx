// TestimonialsCarousel.js
import React, { useEffect, useState } from 'react';
import './TestimonialsCarousel.css';

const TestimonialsCarousel = ({ testimonials }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [fadeEffect, setFadeEffect] = useState("fade-in");


  const goToCard = (index) => {
    setFadeEffect('fade-out');
    setTimeout(() => {
      setCurrentCard(index);
      setFadeEffect('fade-in');
    }, 300);
  };

  const goToPreviousCard = () => {
    setFadeEffect('fade-out');
    setTimeout(() => {
      setCurrentCard((prevCard) =>
        prevCard === 0 ? testimonials.length - 1 : prevCard - 1
      );
      setFadeEffect('fade-in');
    }, 300);
  };

  const goToNextCard = () => {
    setFadeEffect('fade-out');
    setTimeout(() => {
      setCurrentCard((prevCard) =>
        prevCard === testimonials.length - 1 ? 0 : prevCard + 1
      );
      setFadeEffect('fade-in');
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextCard();
    }, 25000);

    return () => clearInterval(interval);
  }, [currentCard]);

  return (
    <div className='testimonials-carousel'>
      <div className='testimonials-container'>
        <div className={`testimonials-card ${fadeEffect}`}>
            <img
              src={testimonials[currentCard].image}
              alt={testimonials[currentCard].name}
              className='testimonial-image'
            />

          <div className='testimonial-text'>
            
            <div className='grad-info'>
              <h4 className='grad-name'>{testimonials[currentCard].name}</h4>
              <p className='grad-year'>Class of {testimonials[currentCard].gradYear}</p>
            </div>
            
            <p>{testimonials[currentCard].text}</p>
          </div>
        </div>
      </div>

      <div className='carousel-controls'>
        <button className='carousel-btn back' onClick={goToPreviousCard}>
          &#8249;
        </button>

        <div className='carousel-indicator'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${currentCard === index ? 'active' : ''}`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>

        <button className='carousel-btn next' onClick={goToNextCard}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;