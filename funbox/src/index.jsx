import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store';

import 'console-polyfill';
import 'classlist-polyfill';
import 'babel-polyfill';
import './styles';

ymaps.ready(() => {
	const store = configureStore();
	render(
		<Root store={store} />,
		document.getElementById('app')
	);
});