import React from 'react';
import { render } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';
import App from './components/app.jsx';
import cities from './data/cities';
import symbols from './data/symbols';

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const styletron = new Styletron([styleSheet]);

render(<StyletronProvider styletron={styletron}>
	<App
		title="Weather"
		cities={cities}
		symbols={symbols}
	/>
</StyletronProvider>, document.getElementById('root'));
