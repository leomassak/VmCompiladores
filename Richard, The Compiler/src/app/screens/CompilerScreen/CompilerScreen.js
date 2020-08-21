import React from 'react';

import './styles.scss';

class WelcomeScreen extends React.PureComponent {
  render() {
    return (
      <div className="panel">
        <div className="header-panel">
          <ul>
            <li>
              Arquivo
            </li>
            <li>
              Executar
            </li>
            <li>
              Sobre
            </li>
          </ul>
        </div>
        <div className="main-panel">
          <div className="table">
            <div className="area-content" />
          </div>
          <div className="stack">
            <div className="area-content" />
          </div>
          <div className="input">
            <div className="area-content" />
          </div>
          <div className="output">
            <div className="area-content" />
          </div>
          <div className="breakpoint">
            <div className="area-content" />
          </div>
        </div>
        <div className="footer-panel" />
      </div>
    );
  }
}

export default WelcomeScreen;
