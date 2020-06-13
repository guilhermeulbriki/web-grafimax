import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.png';
import Footer from '../../components/footer';
import { Container } from './style';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { sigIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        await sigIn({
          email,
          password,
        });

        history.push('/toner');
      } catch (err) {
        alert('Erro no login, confira seus campos e tente novamente!');
        console.log(err);
      }
    },
    [email, history, password, sigIn],
  );

  return (
    <Container>
      <div className="content">
        <img src={logo} alt="Grafimax" />

        <form onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>

      <Footer />
    </Container>
  );
};

export default Dashboard;
