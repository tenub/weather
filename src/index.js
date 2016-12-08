import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import cities from './data/cities';

render(<App title="Weather" cities={cities} />, document.getElementById('root'));
