import React, { useState } from 'react';
import './UserPage.css';

const UserPage: React.FC = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  return (
    <div className="user-page">
      <div className="form-container">
        <section className="form-section">
          <h2>Entrar</h2>
          <form>
            <div className="form-group">
              <label htmlFor="login-username">Usuário:</label>
              <input
                id="login-username"
                type="text"
                className="form-input"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Senha:</label>
              <input
                id="login-password"
                type="password"
                className="form-input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
          </form>
        </section>

        <section className="form-section">
          <h2>Cadastrar</h2>
          <form>
            <div className="form-group">
              <label htmlFor="register-username">Usuário:</label>
              <input
                id="register-username"
                type="text"
                className="form-input"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-password">Senha:</label>
              <input
                id="register-password"
                type="password"
                className="form-input"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-confirm-password">Confirmar Senha:</label>
              <input
                id="register-confirm-password"
                type="password"
                className="form-input"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UserPage;
