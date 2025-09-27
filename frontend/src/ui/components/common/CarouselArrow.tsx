import React from 'react';

interface CarouselArrowProps {
  direction: 'prev' | 'next' | 'play';
}

const CarouselArrow: React.FC<CarouselArrowProps> = ({ direction }) => {
  const getIcon = () => {
    if (direction === 'prev') return '<';
    if (direction === 'next') return '>';
    if (direction === 'play') return '▶';
  }
  return (
    <button className={`carousel-arrow ${direction}`}>
      {getIcon()}
    </button>
  );
};

export default CarouselArrow;
