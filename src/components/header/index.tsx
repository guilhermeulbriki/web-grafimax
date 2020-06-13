import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import logo from '../../assets/logo.png';

import { Container } from './style';
import { useAuth } from '../../hooks/Auth';

const Header: React.FC = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <div className="content">
        <img src={logo} alt="Grafimax" />

        <aside>
          <nav>
            <Link
              to="/toner"
              className={location.pathname === '/toner' ? 'here' : 'not-here'}
            >
              Troca de Toner
            </Link>
            <Link
              to="/error"
              className={location.pathname === '/error' ? 'here' : 'not-here'}
            >
              Codigo de Erro
            </Link>
            <Link
              to="/maintenance"
              className={
                location.pathname === '/maintenance' ? 'here' : 'not-here'
              }
            >
              Manutenções
            </Link>
          </nav>
          <FiPower size={24} onClick={handleSignOut} />
        </aside>
      </div>
    </Container>
  );
};

export default Header;
