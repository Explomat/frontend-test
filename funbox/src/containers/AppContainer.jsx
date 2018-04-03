import React from 'react';
import PropTypes from 'prop-types';
import { AlertDanger, AlertInfo } from '../components/modules/alert';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
// import cx from 'classnames';

const AppContainer = ({ errorMessage, infoMessage, error, info, children }) => {
	return (
		<div className='app-container'>
			<div className='app-container__header'>
				{errorMessage &&
					<AlertDanger
						text={errorMessage}
						onClose={error.bind(this, null)}
						className='app-container__error'
					/>
				}
				{infoMessage &&
					<AlertInfo
						text={infoMessage}
						onClose={info.bind(this, null)}
						className='app-container__error'
					/>
				}
			</div>
			<div className='app-container__body'>
				{children}
			</div>
		</div>
	);
};

AppContainer.propTypes = {
	children: PropTypes.node,
	errorMessage: PropTypes.string,
	infoMessage: PropTypes.string
};

function mapStateToProps(state) {
	return { ...state.app };
}

export default connect(mapStateToProps, actionCreators)(AppContainer);