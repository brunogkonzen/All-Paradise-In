import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import Blackjack from './Blackjack';

const App = () => {
  return (
    <div>
      <Blackjack />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
