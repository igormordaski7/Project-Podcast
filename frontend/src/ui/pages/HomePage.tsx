import React, { useRef } from 'react';
import Header from '../components/Header/Header';
import Carousel from '../components/Carousel/Carousel';
import NewsCard from '../components/NewsCard/NewsCard';
import PodcastCard from '../components/PodcastCard/PodcastCard';
import './HomePage.css';

const newsData = [
  { id: 1, title: "Lançamento do novo produto", image: "/images/produto1.jpg", description: "Confira os detalhes do nosso novo lançamento.", link: "/noticia/1" },
  { id: 2, title: "Evento corporativo", image: "/images/evento.jpg", description: "Veja como foi nosso último evento.", link: "/noticia/2" },
  { id: 3, title: "Parceria anunciada", image: "/images/parceria.jpg", description: "Estamos animados em anunciar uma nova parceria.", link: "/noticia/3" },
  { id: 4, title: "Expansão da fábrica", image: "/images/fabrica.jpg", description: "Nova unidade será inaugurada em breve.", link: "/noticia/4" }
];

const podcastIds = [1,2,3,4,5,6,7,8];

const HomePage: React.FC = () => {
  const newsRef = useRef<HTMLDivElement>(null);
  const podcastsRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: 'news' | 'podcasts') => {
    const ref = section === 'news' ? newsRef : podcastsRef;
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <Header onNavigate={handleNavigate} />

      <div ref={newsRef} className="section news-section">
        <h2>NOTÍCIAS</h2>
        <Carousel itemsToShowDesktop={3}>
          {newsData.map(news => (
            <NewsCard key={news.id} {...news} />
          ))}
        </Carousel>
      </div>

      <div ref={podcastsRef} className="section podcasts-section">
        <h2>PODCASTS</h2>
        <Carousel itemsToShowDesktop={4}>
          {podcastIds.map(id => (
            <PodcastCard key={id} id={id} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;