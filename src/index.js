/* eslint-disable */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';

import configureStore from './store/configureStore';
import './styles/hudStyle.scss';
import './styles/mapStyle.scss';


let store = configureStore();



render(
	<Provider store={store}>
	<App />
	</Provider>, document.getElementById('app')
);
