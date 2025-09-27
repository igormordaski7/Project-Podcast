import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation';

const Menu: React.FC = () => {
  const { currentPage, navigateTo } = useNavigation();

  return (
    <div className="menu-row">
      <div 
        className={`pill ${currentPage === 'home' ? 'selected' : 'unselected'}`}
        onClick={() => navigateTo('home')}
      >
        Notícias
      </div>
      <div 
        className={`pill ${currentPage === 'podcasts' ? 'selected' : 'unselected'}`}
        onClick={() => navigateTo('podcasts')}
      >
        Podcasts
      </div>

      <div className="search">
        <button aria-hidden="true">☰</button>
        <input placeholder="Hinted search text" aria-label="Buscar" />
        <button aria-hidden="true">🔍</button>
      </div>
    </div>
  );
};

export default Menu;
