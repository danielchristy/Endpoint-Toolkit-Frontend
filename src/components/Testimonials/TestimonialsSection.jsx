import React, { useState, useEffect } from 'react';
import './TestimonialsSection.css';

import { gradImages } from '../../static/people/grad-testimonials/gradImages';

function TestimonialsSection() {
  const testimonials = [
    { 
      name: 'Ryan Ramola',
      image: gradImages.ryan,
      gradYear: '2024',
      text: '"Before attending Base Camp Graduate Institute, I spent 11 years working as an automotive technician. While the job gave me valuable experience, it came with limited benefits and few opportunities for long-term growth. I knew I wasn’t happy, and I needed a change. That’s when I found Base Camp. Going through this program was one of the best decisions I’ve ever made. It opened doors I never thought possible and gave me the tools and confidence to transition into the tech industry. Today, I work at mTrade, where I’ve begun a fulfilling career in technology with incredible benefits and room for growth—including the opportunity to eventually move into a development role within the company. Base Camp also gave me the skills and experience to take on freelance work. Balancing a full-time job and life’s challenges while going through an intensive program required a lot of determination. But now, I’m pursuing a career I’ve always been passionate about, and I owe that to Base Camp."'
    },
    {
      name: 'Ashley Glasz',
      image: gradImages.ashley,
      gradYear: '2023',
      text: '"What can I say? Attending Base Camp Coding Academy (BCCA)has completely changed my life. Before BCCA, I was in a job that, while I loved it, had no room for professional growth. The Base Camp opportunity came to my attention by chance and, because I had dabbled in web design in the past, my husband encouraged me to apply. Being a student at BCCA was the most rewarding as well as the hardest thing I have ever done in my professional life. I’ll never forget the people I got to learn alongside, and the memories made there. During the final weeks of Base Camp, I applied for and accepted a job with Hat Boy Software, a small Oxford based software development company. My first year with them I worked part time, fully remote, and was able to learn and grown my development skills. I am now full time with Hat Boy and really enjoy being fully emersed in the software development world. I’ll forever be thankful for the opportunity to attend BCCA and the skillsets I learned while there!"'
    },
    {
      name: 'Trey Shelton',
      image: gradImages.trey,
      gradYear: '2018',
      text: '"Joining Base Camp is very well the most impactful decision I’ve ever made in my life. This program has blessed me in more ways than I can put into a few sentences. BCCA allowed me to join the tech industry as a professional at 19 years old and gain more financial freedom than most people well older than me in age - all while having no student debt. The staff and board members are extremely supportive and I don’t think I can thank everyone there enough for the life changing program!"'
    },
    {
      name: 'Daniel Christy',
      image: gradImages.daniel,
      gradYear: '2025',
      text: '"After being out of college for six years, I wasn’t sure I could still learn effectively. But Base Camp didn’t just teach me to code — it provided a community that supported my learning, interests, and passions, while building my confidence. "'
    },
    {
      name: 'Brittney Bean',
      image: gradImages.brittney,
      gradYear: '2025',
      text: '"From the first day, Base Camp challenged and encouraged me to be my best. Thanks to their intensive training and mentorship, I am now thriving in a career I love."'
    },
    {
      name: 'Spencer Hillhouse',
      image: gradImages.spencer,
      gradYear: '2025',
      text: '"Before Joing BCCA, I doubted that I could break into the tech field. It wasn’t easy balancing the workload between Base Camp and my jobs/personal life, but I knew this was something I wanted to commit to because I saw the benefits that the hands-on learning was giving me. BCCA didn’t just teach me how to code, it also helped me think and work like a real developer - all thanks to the constant support from my peers and instructors."'
    }
  ];


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
    <section className="testimonials">
      <div className="testimonials-section">
        <h4>What BCCA Grads Have To Say</h4>
        <div className="testimonials-carousel">
          <div className="testimonials-container">
            <div className={`testimonials-card ${fadeEffect}`}>
              <img
                src={testimonials[currentCard].image}
                alt={testimonials[currentCard].name}
                className="testimonial-image"
              />
              <div className="testimonial-text">
                <div className="grad-info">
                  <h4 className="grad-name">{testimonials[currentCard].name}</h4>
                  <p className="grad-year">Class of {testimonials[currentCard].gradYear}</p>
                </div>
                <p>{testimonials[currentCard].text}</p>
              </div>
            </div>
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn back" onClick={goToPreviousCard}>
              &#8249;
            </button>

            <div className="carousel-indicator">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator-dot ${currentCard === index ? 'active' : ''}`}
                  onClick={() => goToCard(index)}
                />
              ))}
            </div>

            <button className="carousel-btn next" onClick={goToNextCard}>
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;