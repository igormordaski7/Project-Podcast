import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import userIcon from '../../../assets/images/icon-user.png';

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="user-wrap">
      <button 
        className="icon-btn" 
        onClick={toggleDropdown}
        aria-haspopup="true" 
        aria-expanded={isOpen}
        title="Usuário"
      >
        <img src={userIcon} alt="Usuário" />
      </button>
      
      <div className={`dropdown user-dropdown ${isOpen ? 'show' : ''}`}>
        {user.isLoggedIn ? (
          <>
            <a href="#">Configurações</a>
            <a href="#" onClick={logout}>Logoff</a>
          </>
        ) : (
          <a href="#">Acessar</a>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
