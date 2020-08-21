import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import './teste.scss';

class WelcomeScreen extends React.PureComponent {
  render() {
    return (
      <div className="nome">
        <h1>Bem vindo!</h1>
        <Link to="/teste">
          <Button>Clique aqui!</Button>
        </Link>
      </div>
    );
  }
}

export default WelcomeScreen;
