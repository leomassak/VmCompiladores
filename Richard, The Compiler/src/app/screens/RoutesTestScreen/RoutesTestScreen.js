import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

class RoutesTestScreen extends React.PureComponent {
  render() {
    return (
      <div>
        <Link to="/">
          <Button>Voltar</Button>
        </Link>
      </div>
    );
  }
}

export default RoutesTestScreen;
