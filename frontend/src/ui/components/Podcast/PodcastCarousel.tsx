import React, { useRef } from 'react';
import PodcastCard from './PodcastCard';
import FancyCarouselArrow from '../common/FancyCarouselArrow';
import './PodcastCarousel.css';
import { useNavigation } from '../../../hooks/useNavigation';

interface PodcastItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const PodcastCarousel: React.FC = () => {
  const { navigateTo } = useNavigation();
  const podcastItems: PodcastItem[] = [
    {
      id: '1',
      title: 'Podcast 1',
      subtitle: 'Episódio 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imageUrl: 'placeholder-podcast.png'
    },
    {
      id: '2',
      title: 'Podcast 2',
      subtitle: 'Episódio 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      imageUrl: 'placeholder-podcast.png'
    },
    {
      id: '3',
      title: 'Podcast 3',
      subtitle: 'Episódio 3',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation',
      imageUrl: 'placeholder-podcast.png'
    },
    {
      id: '4',
      title: 'Podcast 4',
      subtitle: 'Episódio 4',
      description: 'Duis aute irure dolor in reprehenderit in voluptate',
      imageUrl: 'placeholder-podcast.png'
    },
    {
      id: '5',
      title: 'Podcast 5',
      subtitle: 'Episódio 5',
      description: 'Excepteur sint occaecat cupidatat non proident',
      imageUrl: 'placeholder-podcast.png'
    },
    {
      id: '6',
      title: 'Podcast 6',
      subtitle: 'Episódio 6',
      description: 'Sunt in culpa qui officia deserunt mollit anim',
      imageUrl: 'placeholder-podcast.png'
    },
    {
      id: '7',
      title: 'Podcast 7',
      subtitle: 'Episódio 7',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      imageUrl: 'placeholder-podcast.png'
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

  const handlePodcastButtonClick = (podcastId: string) => {
    console.log(`Reproduzindo podcast: ${podcastId}`);
    navigateTo('playback');
  };

  return (
    <div className="news-carousel">
      <div className="cards-row" ref={scrollRef}>
        {podcastItems.map((item) => (
          <PodcastCard 
            key={item.id} 
            item={item}
            onButtonClick={() => handlePodcastButtonClick(item.id)}
            buttonText="Ouvir"
          />
        ))}
      </div>
      
      <div className="carousel-controls">
        <FancyCarouselArrow direction="prev" onClick={() => handleScroll('prev')} />
        <FancyCarouselArrow direction="next" onClick={() => handleScroll('next')} />
      </div>
    </div>
  );
};

export default PodcastCarousel;