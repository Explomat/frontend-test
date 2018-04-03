import constants from '../constants';

export default function app(state = {
	errorMessage: null,
	infoMessage: null
}, action) {
	switch (action.type) {

		case constants.APP_ERROR_MESSAGE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.errorMessage
			};
		case constants.APP_INFO_MESSAGE:
			return {
				...state,
				isFetching: false,
				infoMessage: action.infoMessage
			};
		
		default:
			return state;
	}
}

