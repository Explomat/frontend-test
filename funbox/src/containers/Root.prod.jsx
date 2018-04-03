import React from 'react';
import AppContainer from './AppContainer';
import MapsContainer from './MapsContainer';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

const Root = ({ store }) => (
	<Provider store={store}>
		<AppContainer>
			<MapsContainer />
		</AppContainer>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};
export default Root;
