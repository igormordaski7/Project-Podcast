import React, { useRef } from 'react';
import NewsCard from './NewsCard';
import FancyCarouselArrow from '../common/FancyCarouselArrow';
import './NewsCarousel.css';

interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const NewsCarousel: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Title 1',
      subtitle: 'Subtitle 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imageUrl: 'placeholder-news.png'
    },
    {
      id: '2',
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      imageUrl: 'placeholder-news.png'
    },
    {
      id: '3',
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      imageUrl: 'placeholder-news.png'
    },
    {
      id: '4',
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      imageUrl: 'placeholder-news.png'
    },
    {
      id: '5',
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      imageUrl: 'placeholder-news.png'
    },
    {
      id: '6',
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      imageUrl: 'placeholder-news.png'
    },
    {
      id: '7',
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      imageUrl: 'placeholder-news.png'
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'prev' | 'next') => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const scrollAmount = containerWidth / 2;
      if (direction === 'next') {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="news-carousel">
      <div className="cards-row" ref={scrollRef}>
        {newsItems.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
      
      <div className="carousel-controls">
        <FancyCarouselArrow direction="prev" onClick={() => handleScroll('prev')} />
        <FancyCarouselArrow direction="next" onClick={() => handleScroll('next')} />
      </div>
    </div>
  );
};

export default NewsCarousel;
