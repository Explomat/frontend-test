import constants from '../constants';

export default function searchRoute(state = {
	searchValue: '',
	geoData: []
}, action) {
	switch (action.type) {
		case constants.MAPS_CHANGE_SEARCH_VALUE: 
			return {
				...state,
				searchValue: action.value
			};
		case constants.MAPS_GET_GEO_OBJECTS_SUCCESS:
			return {
				...state,
				geoData: action.geoData
			};
		case constants.MAPS_ADD_NEW_ROUTE: {
			return {
				...state,
				searchValue: ''
			};
		}
		
		default:
			return state;
	}
}

