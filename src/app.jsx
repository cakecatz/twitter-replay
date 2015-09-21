import React from 'react';
import TwitterReplayer from './TwitterReplayer.jsx';

const SERVER_URL = 'localhost:8080';

const appStyle = {
  color: 'blue',
  fontFamily: "'.SFNSText-Regular', 'SF UI Text', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, sans-serif;",
};

React.render(
  <TwitterReplayer style={appStyle} server={SERVER_URL} />,
  document.querySelector('#container')
);
