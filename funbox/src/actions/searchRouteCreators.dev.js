import constants from '../constants';
import { error } from './appCreators';
import config from '../config';
import { get } from '../utils/ajax';

export function getGeoObjects(text){
	return dispatch => {
		dispatch({ type: constants.MAPS_GET_GEO_OBJECTS });

		get(`${config.proxyUrl}/${config.url}?apikey=${config.apiKey}&lang=${config.lang}&type=${config.type}&text=${text}`)
		.then(resp => JSON.parse(resp))
		/*ymaps.geocode(coordinates, {
			json: true,
			results: 1
		})*/
		.then(geoData => {
			if (geoData.status !== 'error'){
				dispatch({
					type: constants.MAPS_GET_GEO_OBJECTS_SUCCESS,
					geoData
				});
			}
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