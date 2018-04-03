import constants from '../constants';

export function error(err){
	return {
		type: constants.APP_ERROR_MESSAGE,
		errorMessage: err
	};
}

export function info(inf){
	return {
		type: constants.APP_INFO_MESSAGE,
		infoMessage: inf
	};
}