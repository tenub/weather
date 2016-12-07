import React from 'react';
import { render } from 'react-dom';
import Weather from './components/weather';
import cities from './data/cities';

render(<Weather title="Weather" cities={cities} />, document.getElementById('root'));
