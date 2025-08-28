import React from 'react';
import './MiniHeader.css';

const MiniHeader: React.FC = () => {
  return (
    <header className="mini-header">
      <div className="mini-header-container">
        <h1 className="mini-header-title">PODCASTS</h1>
        <input type="text" placeholder="pesquisar" className="search-input" />
      </div>
    </header>
  );
};

export default MiniHeader;
