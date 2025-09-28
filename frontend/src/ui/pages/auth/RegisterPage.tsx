import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigation } from '../../../hooks/useNavigation';

// Importe a mesma imagem do usuário
import userIcon from '../../../assets/images/icon-user.png';

const RegisterPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ usuario, email, senha });
    // Aqui você pode adicionar a lógica de cadastro
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('login');
  };

  return (
    <div className="register-page-body">
      <div className="register-content">
        <div className="form-card-container">
          {/* Imagem do usuário no topo */}
          <div className="user-icon-container">
            <img 
              src={userIcon} 
              alt="Ícone do usuário" 
              className="user-icon"
            />
          </div>
          
          <h2>CADASTRAR</h2>
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
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
            <button type="submit">Cadastrar</button>
          </form>
          <div className="link-container">
            Já tem uma conta? <a href="#" onClick={handleLoginClick}>Entrar</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;