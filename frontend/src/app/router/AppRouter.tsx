import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import HomePage from '../../ui/pages/HomePage';
import PodcastPage from '../../ui/pages/PodcastPage';
import PlaybackPage from '../../ui/pages/PlaybackPage';
import MainLayout from '../../ui/layouts/MainLayout';

const AppRouter: React.FC = () => {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'podcasts':
        return <PodcastPage />;
      case 'playback':
        return <PlaybackPage />;
      default:
        return <HomePage />;
    }
  };

  return <MainLayout>{renderPage()}</MainLayout>;
};

export default AppRouter;
