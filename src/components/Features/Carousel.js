// src/components/Features/Carousel.js
import React, { useState } from 'react';
import './Carousel.css';

export default function Carousel({ items }) {
  const [active, setActive] = useState(0);
  const total = items.length;

  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  return (
    <div className="feat-carousel-container">
      <div
        className="feat-carousel-content"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {items.map((item, i) => (
          <div className="feat-carousel-item" key={i}>
            {item}
          </div>
        ))}
      </div>
      <button className="feat-carousel-button left" onClick={prev}> ← </button>
      <button className="feat-carousel-button right" onClick={next}> → </button>
    </div>
  );
}
