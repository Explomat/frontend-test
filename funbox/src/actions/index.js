import * as appCreators from './appCreators';

if (process.env.NODE_ENV === 'production') {
	module.exports = {
		...appCreators,
		...require('./searchRouteCreators.prod')
	};
} else {
	module.exports = {
		...appCreators,
		...require('./searchRouteCreators.dev'),
		...require('./routesCreators.dev')
	};
}