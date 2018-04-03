import constants from '../constants';
import { error } from './appCreators';

export function getGeoObjects(text){
	return dispatch => {
		dispatch({ type: constants.MAPS_GET_GEO_OBJECTS });

		ymaps.geocode(text, {
			json: true
		})
		.then(geoData => {
			const collection = geoData.GeoObjectCollection.featureMember;
			dispatch({
				type: constants.MAPS_GET_GEO_OBJECTS_SUCCESS,
				geoData: collection.map(c => {
					return {
						...c.GeoObject
					};
				})
			});
		})
		.catch(err => {
			dispatch(error(err.message));
		});
	};
}

export function changeSearchValue(value){
	return {
		type: constants.MAPS_CHANGE_SEARCH_VALUE,
		value
	};
}