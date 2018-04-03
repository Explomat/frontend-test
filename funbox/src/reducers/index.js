import { combineReducers } from 'redux';
import app from './app';
import searchRoute from './searchRoute';
import routes from './routes';

export default combineReducers({
	app,
	searchRoute,
	routes
});