// /home/rafael/Projects/PesquisaESociedade/podcast/Project-Podcast/frontend/src/hooks/useCurrentPodcast.tsx
import React, { createContext, useContext, useState } from 'react';

export interface PodcastItem {
  id: string;
  titulo: string;
  descricao: string;
  capaUrl: string;
  audioUrl: string | null;
}

interface CurrentPodcastContextType {
  currentPodcast: PodcastItem | null;
  setCurrentPodcast: (podcast: PodcastItem | null) => void;
}

const CurrentPodcastContext = createContext<CurrentPodcastContextType | undefined>(undefined);

export const useCurrentPodcast = () => {
  const context = useContext(CurrentPodcastContext);
  if (!context) {
    throw new Error('useCurrentPodcast must be used within a CurrentPodcastProvider');
  }
  return context;
};

interface CurrentPodcastProviderProps {
  children: React.ReactNode;
}

export const CurrentPodcastProvider = ({ children }: CurrentPodcastProviderProps) => {
  const [currentPodcast, setCurrentPodcast] = useState<PodcastItem | null>(null);

  const value: CurrentPodcastContextType = {
    currentPodcast,
    setCurrentPodcast,
  };

  return (
    <CurrentPodcastContext.Provider value={value}>
      {children}
    </CurrentPodcastContext.Provider>
  );
};