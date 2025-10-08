import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'; // <-- import tipo-only

const CurrentPodcastContext = createContext<any>(null);

export const CurrentPodcastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPodcast, setCurrentPodcast] = useState<any>(() => {
    const stored = localStorage.getItem('currentPodcast');
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <CurrentPodcastContext.Provider value={{ currentPodcast, setCurrentPodcast }}>
      {children}
    </CurrentPodcastContext.Provider>
  );
};

export const useCurrentPodcast = () => useContext(CurrentPodcastContext);