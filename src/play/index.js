import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import React from 'react';
import App from './App';

function mount() {
  render(<App />, document.getElementById('container'));
}

mount();

if (module.hot) {
  module.hot.accept('./App', () => mount());
}
