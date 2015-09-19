import React from 'react';
import TwitterReplayer from './TwitterReplayer.jsx';

const SERVER_URL = 'localhost:8080';

React.render(
  <TwitterReplayer server={SERVER_URL} />,
  document.querySelector('#container')
);
