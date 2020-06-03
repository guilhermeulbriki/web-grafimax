import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';

import { Container } from './style';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <div className="content">
        <img src={logo} alt="Grafimax" />

        <nav>
          <Link
            to="/"
            className={location.pathname === '/' ? 'here' : 'not-here'}
          >
            Troca de Toner
          </Link>
          <Link
            to="/erro"
            className={location.pathname === '/erro' ? 'here' : 'not-here'}
          >
            Codigo de Erro
          </Link>
          <Link
            to="/manutencoes"
            className={
              location.pathname === '/manutencoes' ? 'here' : 'not-here'
            }
          >
            Manutenções
          </Link>
        </nav>
      </div>
    </Container>
  );
};

export default Header;
