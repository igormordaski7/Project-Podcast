import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigation } from '../../../hooks/useNavigation';
import userIcon from '../../../assets/images/icon-user.png';

const LoginPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ usuario, senha });
    // Aqui você pode adicionar a lógica de autenticação
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('register');
  };

  return (
    <div className="login-page-body">
      <div className="form-card-container">
        {/* Imagem do usuário no topo */}
          <div className="user-icon-container">
            <img 
              src={userIcon} 
              alt="Ícone do usuário" 
              className="user-icon"
            />
          </div>
        <h2>ENTRAR</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usuario">Usuário:</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <div className="link-container">
          Não tem uma conta? <a href="#" onClick={handleRegisterClick}>Cadastre-se</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;