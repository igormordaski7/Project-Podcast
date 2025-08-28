import React, { useState } from 'react';
import './Header.css';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#4A90E2"/>
    <path d="M17 8a5 5 0 0 1-10 0" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 10v1a7 7 0 0 1-14 0v-1" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 19h14" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19v3" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface HeaderProps {
  onNavigate?: (section: 'news' | 'podcasts') => void; // função que será passada pelo HomePage
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Logo />
        </div>

        <nav className="header-nav">
          {/* Chamando a função onNavigate que faz scroll para a seção */}
          <button className="nav-btn" onClick={() => onNavigate?.('news')}>NOTÍCIAS</button>
          <button className="nav-btn" onClick={() => onNavigate?.('podcasts')}>PODCASTS</button>
        </nav>

        <div className="header-user-section">
          <button onClick={toggleDropdown} className="header-user-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="user-dropdown">
              <a href="#upload" onClick={() => setIsDropdownOpen(false)}>CADASTRAR PODCAST</a>
              <a href="#user" onClick={() => setIsDropdownOpen(false)}>CONFIGURAÇÕES</a>
              <a href="#user" onClick={() => setIsDropdownOpen(false)}>EDITAR USUÁRIO</a>
              <a href="#logout" onClick={() => setIsDropdownOpen(false)}>LOGOUT</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
