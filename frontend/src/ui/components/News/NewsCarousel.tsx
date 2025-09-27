import React from 'react';
import NewsCard from './NewsCard';
import CarouselArrow from '../common/CarouselArrow';

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
    }
  ];

  return (
    <div className="news-carousel">
      <div className="cards-row">
        {newsItems.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
      
      <div className="carousel-controls">
        <CarouselArrow direction="prev" />
        <CarouselArrow direction="next" />
      </div>
    </div>
  );
};

export default NewsCarousel;
