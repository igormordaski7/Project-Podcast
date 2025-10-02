import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Menu from '../components/Menu/Menu';
import NewsCarousel from '../components/News/NewsCarousel';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="screen" id="homeScreen">
      <h1 className="hero-title">
        Olá <span className="username">{user?.name}</span>, seja bem vindo de volta!<br/>
        Confira nossas últimas notícias e PodCasts!
      </h1>

      <Menu />
      <NewsCarousel />
    </section>
  );
};

export default HomePage;
