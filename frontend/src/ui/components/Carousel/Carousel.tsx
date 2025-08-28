import React, { useState, Children } from "react";
import "./Carousel.css";

interface CarouselProps {
  children: React.ReactNode;
  itemsToShow?: number; // quantos cards visíveis
}

const Carousel: React.FC<CarouselProps> = ({ children, itemsToShow = 3 }) => {
  const total = Children.count(children);
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, total - itemsToShow);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(maxIndex, i + 1));

  return (
    <div className="carousel">
      <button className="carousel-btn prev" onClick={prev} disabled={index === 0}>‹</button>

      <div className="carousel-track">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${(100 / itemsToShow) * index}%)` }}
        >
          {Children.map(children, (child, i) => (
            <div
              key={i}
              className="carousel-item"
              style={{ flex: `0 0 ${100 / itemsToShow}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn next" onClick={next} disabled={index === maxIndex}>›</button>
    </div>
  );
};

export default Carousel;