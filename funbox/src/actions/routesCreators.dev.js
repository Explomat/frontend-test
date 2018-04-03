import constants from '../constants';
import { error } from './appCreators';

export function addNewRoute(route){
	return {
		type: constants.MAPS_ADD_NEW_ROUTE,
		route
	};
}

export function removeRoute(index){
	return {
		type: constants.MAPS_REMOVE_ROUTE,
		index
	};
}

export function replaceRoutes(firstIndex, secondIndex){
	return {
		type: constants.MAPS_REPLACE_ROTES,
		firstIndex,
		secondIndex
	};
}

export function dragRoute(isRouteDragging){
	return {
		type: constants.MAPS_DRAG_ROUTE,
		isRouteDragging
	};
}

export function dragPlacemark(coordinates, index){
	return dispatch => {
		dispatch({ type: constants.MAPS_DRAG_PLACEMARK });

		ymaps.geocode(coordinates, {
			json: true,
			results: 1
		})
		.then(geoData => {
			const collection = geoData.GeoObjectCollection.featureMember;
			if (collection.length > 0){
				dispatch({
					type: constants.MAPS_DRAG_PLACEMARK_SUCCESS,
					index,
					geoObject: {
						...collection[0].GeoObject
					}
				});
			}
		})
		.catch(err => {
			dispatch(error(err.message));
		});
	};
}