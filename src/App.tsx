import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import Header from './components/header';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes />

      <GlobalStyle />
    </Router>
  );
};

export default App;
