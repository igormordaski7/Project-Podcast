import React from 'react';
import { useParams } from 'react-router-dom';
import './PodcastDetailPage.css';

const SoundwavePlayer = () => (
  <div className="podcast-player-placeholder">
    <span>&#9654;</span> {/* Play icon */}
    <span>...</span>
    <span>&#127908;</span> {/* Microphone icon */}
  </div>
);

const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="podcast-detail-page">
      <div className="podcast-info">
        <h1>Titulo do Podcast (ID: {id})</h1>
        <p>
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis
          nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea
          commodo consequat. Excepteur
          sint occaecat cupidatat non
          proident, sunt in culpa qui officia
          deserunt mollit anim id est
          laborum.
        </p>
        <SoundwavePlayer />
      </div>
      <div className="podcast-cover-container">
        <img
          src="https://i.imgur.com/6bT1Rj8.png" // Placeholder image of the mic with sunglasses
          alt="Podcast Cover"
          className="podcast-cover-image"
        />
      </div>
    </div>
  );
};

export default PodcastDetailPage;
