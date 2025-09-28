import React from 'react';
import PlayerCard from '../components/Player/PlayerCard';
import { useAuth } from '../../hooks/useAuth';
import Menu from '../components/Menu/Menu';

const PlaybackPage: React.FC = () => {
  const { user } = useAuth();
  // Placeholder data for the currently playing podcast
  const currentlyPlaying = {
    title: 'Podcast Title',
    subtitle: 'Episode 1',
    imageUrl: 'placeholder-podcast.png' // Replace with a real image URL
  };

  return (
    <section className="screen" id="playbackScreen">
      <h1 className="hero-title">
        Olá <span className="username">{user.name}</span>, seja bem vindo de volta!<br/>
        Confira nossas últimas notícias e PodCasts!
      </h1>

      <Menu />
      <PlayerCard 
        title={currentlyPlaying.title}
        subtitle={currentlyPlaying.subtitle}
        imageUrl={currentlyPlaying.imageUrl}
      />
    </section>
  );
};

export default PlaybackPage;
